#include <stdio.h>
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/timers.h"
#include "freertos/event_groups.h"
#include "esp_wifi.h"
#include "esp_log.h"
#include "nvs_flash.h"
#include "esp_netif.h"
#include "esp_http_client.h"
#include "esp_camera.h"
#include "esp_vfs_fat.h"
#include "esp_spiffs.h"
#include "sdkconfig.h"
#include "camera_pins.h"
#include "soc/soc_caps.h"
#include "driver/sdspi_host.h"
#include "mbedtls/base64.h"
#include "driver/spi_common.h"
#if SOC_SDMMC_HOST_SUPPORTED
#include "driver/sdmmc_host.h"
#endif
#include "sdmmc_cmd.h"
#define MOUNT_POINT "/sdcard"
#define BLINK_GPIO GPIO_NUM_4
// #define VIDEO_FILE MOUNT_POINT "/video9.MP4"

#define filename "test.jpg"
#define VIDEO_FILE MOUNT_POINT "/" filename

#include "cJSON.h"
#ifdef CONFIG_EXAMPLE_MOUNT_SD_CARD

esp_err_t example_mount_storage(const char* base_path)
{
    printf( "Initializing SD card");

    esp_vfs_fat_sdmmc_mount_config_t mount_config = {
#ifdef CONFIG_EXAMPLE_FORMAT_IF_MOUNT_SDCARD_FAILED
        .format_if_mount_failed = true,
#else
        .format_if_mount_failed = false,
#endif // CONFIG_EXAMPLE_FORMAT_IF_MOUNT_SDCARD_FAILED
        .max_files = 5,
        .allocation_unit_size = 16 * 1024
    };
    esp_err_t ret;
    sdmmc_card_t* card;

#ifdef CONFIG_EXAMPLE_USE_SDMMC_HOST
    printf( "Using SDMMC peripheral");
    sdmmc_host_t host = SDMMC_HOST_DEFAULT();

    // This initializes the slot without card detect (CD) and write protect (WP) signals.
    // Modify slot_config.gpio_cd and slot_config.gpio_wp if your board has these signals.
    sdmmc_slot_config_t slot_config = SDMMC_SLOT_CONFIG_DEFAULT();

    // To use 1-line SD mode, change this to 1:
    slot_config.width = 4;

#ifdef SOC_SDMMC_USE_GPIO_MATRIX
    // For chips which support GPIO Matrix for SDMMC peripheral, specify the pins.
    slot_config.clk = CONFIG_EXAMPLE_PIN_CLK;
    slot_config.cmd = CONFIG_EXAMPLE_PIN_CMD;
    slot_config.d0 = CONFIG_EXAMPLE_PIN_D0;
    slot_config.d1 = CONFIG_EXAMPLE_PIN_D1;
    slot_config.d2 = CONFIG_EXAMPLE_PIN_D2;
    slot_config.d3 = CONFIG_EXAMPLE_PIN_D3;
#endif // SOC_SDMMC_USE_GPIO_MATRIX

    // Enable internal pullups on enabled pins. The internal pullups
    // are insufficient however, please make sure 10k external pullups are
    // connected on the bus. This is for debug / example purpose only.
    slot_config.flags |= SDMMC_SLOT_FLAG_INTERNAL_PULLUP;

    ret = esp_vfs_fat_sdmmc_mount(base_path, &host, &slot_config, &mount_config, &card);

#else // CONFIG_EXAMPLE_USE_SDMMC_HOST

    printf( "Using SPI peripheral");

    sdmmc_host_t host = SDSPI_HOST_DEFAULT();
    spi_bus_config_t bus_cfg = {
        .mosi_io_num = CONFIG_EXAMPLE_PIN_MOSI,
        .miso_io_num = CONFIG_EXAMPLE_PIN_MISO,
        .sclk_io_num = CONFIG_EXAMPLE_PIN_CLK,
        .quadwp_io_num = -1,
        .quadhd_io_num = -1,
        .max_transfer_sz = 4000,
    };

    ret = spi_bus_initialize(host.slot, &bus_cfg, SDSPI_DEFAULT_DMA);
    if (ret != ESP_OK) {
        printf( "Failed to initialize bus.");
        return ret;
    }

    // This initializes the slot without card detect (CD) and write protect (WP) signals.
    // Modify slot_config.gpio_cd and slot_config.gpio_wp if your board has these signals.
    sdspi_device_config_t slot_config = SDSPI_DEVICE_CONFIG_DEFAULT();
    slot_config.gpio_cs = CONFIG_EXAMPLE_PIN_CS;
    slot_config.host_id = host.slot;
    ret = esp_vfs_fat_sdspi_mount(base_path, &host, &slot_config, &mount_config, &card);

#endif // !CONFIG_EXAMPLE_USE_SDMMC_HOST

    if (ret != ESP_OK){
        if (ret == ESP_FAIL) {
            printf( "Failed to mount filesystem. "
                "If you want the card to be formatted, set the EXAMPLE_FORMAT_IF_MOUNT_FAILED menuconfig option.");
        } else {
            printf( "Failed to initialize the card (%s). "
                "Make sure SD card lines have pull-up resistors in place.", esp_err_to_name(ret));
        }
        return ret;
    }

    sdmmc_card_print_info(stdout, card);
    return ESP_OK;
}

#else // CONFIG_EXAMPLE_MOUNT_SD_CARD

/* Function to initialize SPIFFS */
esp_err_t example_mount_storage(const char* base_path)
{
    printf( "Initializing SPIFFS");

    esp_vfs_spiffs_conf_t conf = {
        .base_path = base_path,
        .partition_label = NULL,
        .max_files = 5,   // This sets the maximum number of files that can be open at the same time
        .format_if_mount_failed = true
    };

    esp_err_t ret = esp_vfs_spiffs_register(&conf);
    if (ret != ESP_OK) {
        if (ret == ESP_FAIL) {
            printf( "Failed to mount or format filesystem");
        } else if (ret == ESP_ERR_NOT_FOUND) {
            printf( "Failed to find SPIFFS partition");
        } else {
            printf( "Failed to initialize SPIFFS (%s)", esp_err_to_name(ret));
        }
        return ret;
    }

    size_t total = 0, used = 0;
    ret = esp_spiffs_info(NULL, &total, &used);
    if (ret != ESP_OK) {
        printf( "Failed to get SPIFFS partition information (%s)", esp_err_to_name(ret));
        return ret;
    }

    printf( "Partition size: total: %d, used: %d", total, used);
    return ESP_OK;
}

#endif // !CONFIG_EXAMPLE_MOUNT_SD_CARD


#define SSID "thai"
    #define PASS "123123123"
int WifiConnection = 0;
static void wifi_event_handler(void *event_handler_arg, esp_event_base_t event_base, int32_t event_id, void *event_data)
{
    switch (event_id)
    {
    case WIFI_EVENT_STA_START:
        printf("WiFi connecting ... \n");
        break;
    case WIFI_EVENT_STA_CONNECTED:
        printf("WiFi connected ... \n");
        WifiConnection = 1;
        gpio_set_level(BLINK_GPIO, 1);
        break;
    case WIFI_EVENT_STA_DISCONNECTED:
        printf("WiFi lost connection ... \n");
        WifiConnection = 0;
        gpio_set_level(BLINK_GPIO, 0);
        esp_wifi_connect();
        break;
    case IP_EVENT_STA_GOT_IP:
        printf("WiFi got IP ... \n\n");
        break;
    default:
        break;
    }
}
#define CONFIG_XCLK_FREQ 20000000 
static esp_err_t init_camera(void)
{
    camera_config_t camera_config = {
        .pin_pwdn  = CAM_PIN_PWDN,
        .pin_reset = CAM_PIN_RESET,
        .pin_xclk = CAM_PIN_XCLK,
        .pin_sccb_sda = CAM_PIN_SIOD,
        .pin_sccb_scl = CAM_PIN_SIOC,

        .pin_d7 = CAM_PIN_D7,
        .pin_d6 = CAM_PIN_D6,
        .pin_d5 = CAM_PIN_D5,
        .pin_d4 = CAM_PIN_D4,
        .pin_d3 = CAM_PIN_D3,
        .pin_d2 = CAM_PIN_D2,
        .pin_d1 = CAM_PIN_D1,
        .pin_d0 = CAM_PIN_D0,
        .pin_vsync = CAM_PIN_VSYNC,
        .pin_href = CAM_PIN_HREF,
        .pin_pclk = CAM_PIN_PCLK,

        .xclk_freq_hz = CONFIG_XCLK_FREQ,
        .ledc_timer = LEDC_TIMER_0,
        .ledc_channel = LEDC_CHANNEL_0,

        .pixel_format = PIXFORMAT_JPEG,
        .frame_size = FRAMESIZE_VGA,

        .jpeg_quality = 10,
        .fb_count = 1,
        .grab_mode = CAMERA_GRAB_WHEN_EMPTY};//CAMERA_GRAB_LATEST. Sets when buffers should be filled
    esp_err_t err = esp_camera_init(&camera_config);
    if (err != ESP_OK)
    {
        return err;
    }
    return ESP_OK;
}
esp_err_t wifi_connection()
{
    // 1 - Wi-Fi/LwIP Init Phase
    esp_netif_init();                    // TCP/IP initiation 					s1.1
    esp_event_loop_create_default();     // event loop 			                s1.2
    esp_netif_create_default_wifi_sta(); // WiFi station 	                    s1.3
    wifi_init_config_t wifi_initiation = WIFI_INIT_CONFIG_DEFAULT();
    esp_wifi_init(&wifi_initiation); // 					                    s1.4
    // 2 - Wi-Fi Configuration Phase
    esp_event_handler_register(WIFI_EVENT, ESP_EVENT_ANY_ID, wifi_event_handler, NULL);
    esp_event_handler_register(IP_EVENT, IP_EVENT_STA_GOT_IP, wifi_event_handler, NULL);
    wifi_config_t wifi_configuration = {
        .sta = {
            .ssid = SSID,
            .password = PASS}};
    esp_wifi_set_config(ESP_IF_WIFI_STA, &wifi_configuration);
    // 3 - Wi-Fi Start Phase
    esp_wifi_start();
    // 4 - Wi-Fi Connect Phase
    esp_wifi_connect();
    return ESP_OK;
}


struct DateTime {
    int day;
    int month;
    int year;
    int hour;
    int minute;
};

struct DateTime parseDateTime(const char* jsonString) {
    struct DateTime result = {0}; // Initialize to zero

    const char* dayKey = "\"day\":";
    const char* monthKey = "\"month\":";
    const char* yearKey = "\"year\":";
    const char* hourKey = "\"hour\":";
    const char* minuteKey = "\"minute\":";

    const char* dayValueStart = strstr(jsonString, dayKey);
    const char* monthValueStart = strstr(jsonString, monthKey);
    const char* yearValueStart = strstr(jsonString, yearKey);
    const char* hourValueStart = strstr(jsonString, hourKey);
    const char* minuteValueStart = strstr(jsonString, minuteKey);

    if (dayValueStart != NULL && monthValueStart != NULL && yearValueStart != NULL &&
        hourValueStart != NULL && minuteValueStart != NULL) {

        dayValueStart += strlen(dayKey);
        monthValueStart += strlen(monthKey);
        yearValueStart += strlen(yearKey);
        hourValueStart += strlen(hourKey);
        minuteValueStart += strlen(minuteKey);

        // Find the end of the values
        const char* dayValueEnd = strchr(dayValueStart, ',');
        const char* monthValueEnd = strchr(monthValueStart, ',');
        const char* yearValueEnd = strchr(yearValueStart, ',');
        const char* hourValueEnd = strchr(hourValueStart, ',');
        const char* minuteValueEnd = strchr(minuteValueStart, ',');

        if (dayValueEnd == NULL) dayValueEnd = strchr(dayValueStart, '}');
        if (monthValueEnd == NULL) monthValueEnd = strchr(monthValueStart, '}');
        if (yearValueEnd == NULL) yearValueEnd = strchr(yearValueStart, '}');
        if (hourValueEnd == NULL) hourValueEnd = strchr(hourValueStart, '}');
        if (minuteValueEnd == NULL) minuteValueEnd = strchr(minuteValueStart, '}');

        if (dayValueEnd != NULL && monthValueEnd != NULL && yearValueEnd != NULL &&
            hourValueEnd != NULL && minuteValueEnd != NULL) {

            // Allocate space for the strings
            char* dayString = malloc(dayValueEnd - dayValueStart + 1);
            char* monthString = malloc(monthValueEnd - monthValueStart + 1);
            char* yearString = malloc(yearValueEnd - yearValueStart + 1);
            char* hourString = malloc(hourValueEnd - hourValueStart + 1);
            char* minuteString = malloc(minuteValueEnd - minuteValueStart + 1);

            // Copy the values
            strncpy(dayString, dayValueStart, dayValueEnd - dayValueStart);
            strncpy(monthString, monthValueStart, monthValueEnd - monthValueStart);
            strncpy(yearString, yearValueStart, yearValueEnd - yearValueStart);
            strncpy(hourString, hourValueStart, hourValueEnd - hourValueStart);
            strncpy(minuteString, minuteValueStart, minuteValueEnd - minuteValueStart);

            // Null-terminate the strings
            dayString[dayValueEnd - dayValueStart] = '\0';
            monthString[monthValueEnd - monthValueStart] = '\0';
            yearString[yearValueEnd - yearValueStart] = '\0';
            hourString[hourValueEnd - hourValueStart] = '\0';
            minuteString[minuteValueEnd - minuteValueStart] = '\0';

            // Convert the strings to integers
            result.day = atoi(dayString);
            result.month = atoi(monthString);
            result.year = atoi(yearString);
            result.hour = atoi(hourString);
            result.minute = atoi(minuteString);

            // Free allocated memory
            free(dayString);
            free(monthString);
            free(yearString);
            free(hourString);
            free(minuteString);

        } else {
            printf("Error: Could not find end of values\n");
        }
    } else {
        printf("Error: Could not find day, month, year, hour, or minute keys\n");
    }

    return result;
}

struct DateTime parsedDateTime;
esp_err_t client_event_get_handler(esp_http_client_event_handle_t evt)
{
    switch (evt->event_id)
    {
    case HTTP_EVENT_ON_DATA:
        printf("HTTP_EVENT_ON_DATA: %.*s\n", evt->data_len, (char *)evt->data);
        // Print the results
       
        parsedDateTime = parseDateTime((char *)evt->data);
         printf("Day: %d\n", parsedDateTime.day);
        printf("Month: %d\n", parsedDateTime.month);
        printf("Year: %d\n", parsedDateTime.year);
        printf("Hour: %d\n", parsedDateTime.hour);
        printf("Minute: %d\n", parsedDateTime.minute);
        break;

    default:
        break;
    }
    return ESP_OK;
}
esp_err_t client_event_get_handler2(esp_http_client_event_handle_t evt)
{
    switch (evt->event_id)
    {
    case HTTP_EVENT_ON_DATA:
        break;

    default:
        break;
    }
    return ESP_OK;
}
static void rest_get()
{
    esp_http_client_config_t config_get = {
        .url = "https://tools.aimylogic.com/api/now?tz=Asia/Ho_Chi_Minh&format=dd/MM/yyyy",
        .method = HTTP_METHOD_GET,
        .cert_pem = NULL,
        .event_handler = client_event_get_handler};
        
    esp_http_client_handle_t client = esp_http_client_init(&config_get);
    esp_http_client_perform(client);
    esp_http_client_cleanup(client);
}
static void token_get()
{
    esp_http_client_config_t config_get = {
        .url = "https://946b-115-73-215-18.ngrok-free.app/api/listFileBase",
        .method = HTTP_METHOD_GET,
        .event_handler = client_event_get_handler2};
        
    esp_http_client_handle_t client = esp_http_client_init(&config_get);
    char header[400];
    const char *boundary = "BoundaryString"; // You can choose your own boundary string
    char content_type_header[128];
    snprintf(content_type_header, sizeof(content_type_header), "multipart/form-data; boundary=%s", boundary);
    esp_http_client_set_header(client, "Content-Type", content_type_header);
    esp_http_client_set_header(client, "Host", "946b-115-73-215-18.ngrok-free.app");
    snprintf(header, sizeof(header), "--%s\r\nContent-Disposition: form-data;\
    Content-Length:0;\
    Content-Type: image/jpeg\r\n\r\n", boundary);
//Host:\"946b-115-73-215-18.ngrok-free.app\";
    char footer[64];
    snprintf(footer, sizeof(footer), "\r\n--%s--\r\n", boundary);

    esp_http_client_open(client,strlen(header) + strlen(footer)); // Set the expected content length
    esp_http_client_write(client, header, strlen(header));
    esp_http_client_write(client, footer, strlen(footer));

    esp_http_client_perform(client);
    esp_http_client_cleanup(client);
}
esp_err_t client_event_post_handler(esp_http_client_event_handle_t evt)
{
    switch (evt->event_id)
    {
    case HTTP_EVENT_ON_DATA:
        printf("HTTP_EVENT_ON_DATA: %.*s\n", evt->data_len, (char *)evt->data);
        break;

    default:
        break;
    }
    return ESP_OK;
}
unsigned num = 0;
void LedFlash(void)
{
    gpio_set_level(BLINK_GPIO, 0);
    vTaskDelay(100 / portTICK_PERIOD_MS);
    gpio_set_level(BLINK_GPIO, 1);
}
static void post_rest_function()
{
    LedFlash();
    LedFlash();
    camera_fb_t* fb = NULL;
    
    esp_http_client_config_t config_post = {
        .url = "http://192.168.155.238:3001/api/upload2",
        .method = HTTP_METHOD_POST,
        .event_handler = client_event_post_handler,
    };

    esp_http_client_handle_t client = esp_http_client_init(&config_post);

    // Set the content type to 'multipart/form-data' with a boundary
        const char *boundary = "BoundaryString"; // You can choose your own boundary string
        char content_type_header[128];
        snprintf(content_type_header, sizeof(content_type_header), "multipart/form-data; boundary=%s", boundary);

    esp_http_client_set_header(client, "Content-Type", content_type_header);

    // Prepare the request body
    char header[300];
    char date [17];
    char contentleng[10];
    // while(1)
    {
        fb = esp_camera_fb_get();
        if (!fb) {
            printf( "Camera capture failed");
            esp_err_t res = ESP_FAIL;
            return;
        }
        sprintf(contentleng, "%d", fb->len);
        // esp_http_client_set_header(client, "Content-Length", contentleng);
        sprintf(date, "%d_%d_%d_%d_%d_%d", parsedDateTime.day, parsedDateTime.month, parsedDateTime.year, parsedDateTime.hour, parsedDateTime.minute, 8);
        printf("Send:%s\n", date);
        snprintf(header, sizeof(header), "--%s\r\nContent-Disposition: form-data; name=\"file\"; filename=\"%s.jpg\"\r\nContent-Type: image/jpeg;\r\n\r\n", boundary, date);
        // snprintf(header, sizeof(header), "--%s\r\nContent-Disposition: form-data; name=\"file\"; filename=\"%s.jpg\"\r\nContent-Type: image/jpeg;ngrok-skip-browser-warning: 0;Host: \"https://946b-115-73-215-18.ngrok-free.app\"\r\n\r\n", boundary, date);
        char footer[64];
        snprintf(footer, sizeof(footer), "\r\n--%s--\r\n", boundary);

        esp_http_client_open(client, fb->len + strlen(header) + strlen(footer)); // Set the expected content length

        // // Send the headers and the file content
        esp_http_client_write(client, header, strlen(header));
        
        esp_http_client_write(client, (char*)fb->buf, fb->len);
        
        // Send the footer to finish the form data
        esp_http_client_write(client, footer, strlen(footer));

        // Send the request
        esp_http_client_perform(client);
        esp_camera_fb_return(fb);
        LedFlash();
    }

    esp_http_client_cleanup(client);
}

// static void post_rest_function()
// {
//     camera_fb_t* fb = NULL;
    
//     esp_http_client_config_t config_post = {
//         .url = "http://192.168.155.95:3000/uploadTest",
//         .method = HTTP_METHOD_POST,
//         .event_handler = client_event_post_handler,
//     };

//     esp_http_client_handle_t client = esp_http_client_init(&config_post);

//     // Set the content type to 'multipart/form-data' with a boundary
//         const char *boundary = "BoundaryString"; // You can choose your own boundary string
//         char content_type_header[128];
//         snprintf(content_type_header, sizeof(content_type_header), "multipart/form-data; boundary=%s", boundary);

//     esp_http_client_set_header(client, "Content-Type", content_type_header);
//     // Content-Length: %d;
//     // Host:\"946b-115-73-215-18.ngrok-free.app"
//     char host[128];
//     // sprintf(host, "192.168.155.95");
//     // esp_http_client_set_header(client, "Host", host);
//     esp_http_client_set_header(client, "Content-Length","0");
//     esp_http_client_set_header(client, "ngrok-skip-browser-warning","69420");
//     // Prepare the request body
//     char header[300];
//     char date [17];
//     char contentleng[10];
//     // while(1)
//     {
//         fb = esp_camera_fb_get();
//         if (!fb) {
//             printf( "Camera capture failed");
//             esp_err_t res = ESP_FAIL;
//             return;
//         }
//         sprintf(contentleng, "%d", fb->len);
//         // esp_http_client_set_header(client, "Content-Length", contentleng);
//         // sprintf(date, "%d_%d_%d_%d_%d_%d", parsedDateTime.day, parsedDateTime.month, parsedDateTime.year, parsedDateTime.hour, parsedDateTime.minute, num);
//         printf("Send:%s\n", date);
//         // snprintf(header, sizeof(header), "--%s\r\nContent-Disposition: form-data; Host:192.168.137.1:3000; name=\"file\"; filename=\"%s.jpg\"\r\nContent-Type: image/jpeg;ngrok-skip-browser-warning:0;Content-Length:%d \r\n\r\n", boundary, date,0);
//         // snprintf(header, sizeof(header), "--%s\r\nContent-Disposition: form-data; name=\"file\"; filename=\"%s.jpg\"\r\nContent-Type: image/jpeg;ngrok-skip-browser-warning: 0;Host: \"https://946b-115-73-215-18.ngrok-free.app\"\r\n\r\n", boundary, date);
//         char footer[64];
//         // snprintf(footer, sizeof(footer), "\r\n--%s--\r\n", boundary);

//         esp_http_client_open(client,strlen(header) + strlen(footer)); // Set the expected content length

//         // // Send the headers and the file content
//         esp_http_client_write(client, header, strlen(header));

//         // Send the footer to finish the form data
//         esp_http_client_write(client, footer, strlen(footer));

//         // Send the request
//         esp_http_client_perform(client);
//         esp_camera_fb_return(fb);
//     }

//     esp_http_client_cleanup(client);
// }//hello
void WaitForConnection(void)
{
    while(!WifiConnection)
    {
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}
void app_main(void)
{
    nvs_flash_init();
    while(1)
    {
        if(wifi_connection() == ESP_OK)
            break;
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
    esp_err_t err = init_camera();
    if (err != ESP_OK)
    {
        printf("err: %s\n", esp_err_to_name(err));
        return;
    }
    // example_mount_storage(MOUNT_POINT);
    printf("WIFI was initiated ...........\n\n");
    WaitForConnection();
    vTaskDelay(2000 / portTICK_PERIOD_MS);
    rest_get();
    // token_get();
    gpio_config_t io_conf = {
        .pin_bit_mask = (1ULL << BLINK_GPIO),
        .mode = GPIO_MODE_OUTPUT,
        .intr_type = GPIO_INTR_DISABLE,
        .pull_up_en = GPIO_PULLUP_DISABLE,
        .pull_down_en = GPIO_PULLDOWN_DISABLE,
    };
    gpio_config(&io_conf);
    gpio_set_level(BLINK_GPIO, 1);
    while(1)
    {
        WaitForConnection();
        num++;
        // token_get();
        post_rest_function();
        vTaskDelay(3000 / portTICK_PERIOD_MS);
    }
    return;
    // while(1)
    // {
    //     rest_get();
    //     post_rest_function();
    //     vTaskDelay(30*1000 / portTICK_PERIOD_MS);
    // }
}