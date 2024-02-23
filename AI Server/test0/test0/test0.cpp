#include <opencv2/opencv.hpp>

#include <opencv2/dnn.hpp>

#include <fstream>

#include <iostream>

#include <vector>


using namespace cv;
using namespace cv::dnn;
//code below is haar cascade for webcam
//int main() {
//
//		// Load the Haar Cascade classifier for face detection (replace with your classifier)
//		cv::CascadeClassifier faceCascade;
//		if (!faceCascade.load("F:/course/course/Luan Van 2/AI Codecascade.xml")) {
//
//		//if (!faceCascade.load("F:/course/course/Luan Van 2/AI Code/test0/x64/Release/haarcascade_frontalface_alt.xml")) {
//		//if (!faceCascade.load("F:/course/course/Luan Van 2/AI Code/test0/x64/Release/myhaar.xml")) {
//
//			std::cerr << "Error loading Haar Cascade classifier!" << std::endl;
//			return -1;
//		}
//
//	// Open the camera (you can specify a different camera index or video file)
//	cv::VideoCapture camera(0);
//	if (!camera.isOpened()) {
//		std::cerr << "Error opening camera!" << std::endl;
//		return -1;
//	}
//
//	while (true) {
//		cv::Mat frame;
//		camera >> frame;
//
//		if (frame.empty()) {
//			std::cerr << "Error reading frame from camera!" << std::endl;
//			break;
//		}
//
//		// Convert the frame to grayscale for detection
//		cv::Mat gray;
//		cv::cvtColor(frame, gray, cv::COLOR_BGR2GRAY);
//
//		// Detect faces
//		std::vector<cv::Rect> faces;
//		faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, cv::Size(30, 30));
//
//		// Draw rectangles around detected faces
//		for (const cv::Rect& face : faces) {
//			cv::rectangle(frame, face, cv::Scalar(0, 255, 0), 2);
//			cv::putText(frame, "Face", cv::Point(face.x, face.y - 10), cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(0, 255, 0), 2);
//		}
//
//		// Display the frame with detected faces
//		cv::imshow("Object Detection", frame);
//
//		// Exit the loop if the 'q' key is pressed
//		if (cv::waitKey(1) == 'q') {
//			break;
//		}
//	}
//
//	// Release the camera and close all OpenCV windows
//	camera.release();
//	cv::destroyAllWindows();
//
//	return 0;
//}
/////////////////////////////////////////////////
//code below is haar cascade for video
//
//int main() {
//	// Load the Haar Cascade classifier for face detection (replace with your classifier)
//	cv::CascadeClassifier faceCascade;
//	if (!faceCascade.load("F:/course/course/Luan Van 2/AI Code/test0/x64/Release/myhaar.xml")) {
//		std::cerr << "Error loading Haar Cascade classifier!" << std::endl;
//		return -1;
//	}
//
//	// Open the video file
//	cv::VideoCapture video("F:/course/course/Luan Van 2/AI Code/test0/noFace0.mp4");  // Replace with the path to your video file
//
//	if (!video.isOpened()) {
//		std::cerr << "Error opening video!" << std::endl;
//		return -1;
//	}
//
//	while (true) {
//		cv::Mat frame;
//		video >> frame;
//
//		if (frame.empty()) {
//			std::cerr << "End of video!" << std::endl;
//			break;
//		}
//
//		// Convert the frame to grayscale for detection
//		cv::Mat gray;
//		cv::cvtColor(frame, gray, cv::COLOR_BGR2GRAY);
//
//		// Detect faces
//		std::vector<cv::Rect> faces;
//		faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, cv::Size(30, 30));
//
//		// Draw rectangles around detected faces and add labels
//		for (const cv::Rect& face : faces) {
//			cv::rectangle(frame, face, cv::Scalar(0, 255, 0), 2);
//
//			// Add a label "Face" above the rectangle
//			cv::putText(frame, "Face", cv::Point(face.x, face.y - 10), cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(0, 255, 0), 2);
//		}
//
//		// Display the frame with detected faces
//		cv::imshow("Object Detection", frame);
//
//		// Exit the loop if the 'q' key is pressed
//		if (cv::waitKey(1) == 'q') {
//			break;
//		}
//	}
//
//	// Release the video and close OpenCV windows
//	video.release();
//	cv::destroyAllWindows();
//
//	return 0;
//}
//
//
//
//
//
/////////////////////////////////////////////////
//code below is yolo cascade for custom image
//cv::dnn::Net net = cv::dnn::readNet("E:/Downloads/yolov3.weights", "F:/course/course/Luan Van 2/AI Code/Yolo/darknet/cfg/yolov3.cfg");
//std::ifstream classNamesFile("F:/course/course/Luan Van 2/AI Code/Yolo/darknet/data/coco.names");
//
//
//int main()
//{
//    cv::dnn::Net net = cv::dnn::readNet("E:/Downloads/yolov3.weights", "F:/course/course/Luan Van 2/AI Code/Yolo/darknet/cfg/yolov3.cfg");
//
//    std::vector<std::string> classes;
//    std::ifstream classNamesFile("F:/course/course/Luan Van 2/AI Code/Yolo/darknet/data/coco.names");
//
//    if (classNamesFile.is_open())
//    {
//        std::string className;
//        while (getline(classNamesFile, className))
//        {
//            classes.push_back(className);
//        }
//    }
//
//    cv::VideoCapture cap(0); // Open the default camera (0) or specify the camera's index if you have multiple cameras.
//
//    if (!cap.isOpened())
//    {
//        std::cerr << "Error: Could not open the webcam." << std::endl;
//        return -1;
//    }
//
//    int inputWidth = 416;
//    int inputHeight = 416;
//
//    while (true)
//    {
//        cv::Mat frame;
//        cap >> frame; // Capture a frame from the webcam.
//
//        if (frame.empty())
//        {
//            std::cerr << "Error: Could not read a frame from the webcam." << std::endl;
//            break;
//        }
//
//        cv::Mat blob = cv::dnn::blobFromImage(frame, 1 / 255.0, cv::Size(inputWidth, inputHeight), cv::Scalar(0, 0, 0), true, false);
//        net.setInput(blob);
//
//        std::vector<cv::String> outLayerNames = net.getUnconnectedOutLayersNames();
//
//        std::vector<cv::Mat> detectionMat;
//        net.forward(detectionMat, outLayerNames);
//
//        float confThreshold = 0.5;
//
//        std::vector<cv::Rect> finalBoundingBoxes;
//        float nmsThreshold = 0.4;
//
//        for (size_t i = 0; i < detectionMat.size(); ++i)
//        {
//            cv::Mat detection = detectionMat[i];
//            for (int j = 0; j < detection.rows; ++j)
//            {
//                cv::Mat scores = detection.row(j).colRange(5, detection.cols);
//                cv::Point classIdPoint;
//                double confidence;
//                cv::minMaxLoc(scores, 0, &confidence, 0, &classIdPoint);
//
//                if (confidence > confThreshold)
//                {
//                    int centerX = static_cast<int>(detection.at<float>(j, 0) * frame.cols);
//                    int centerY = static_cast<int>(detection.at<float>(j, 1) * frame.rows);
//                    int width = static_cast<int>(detection.at<float>(j, 2) * frame.cols);
//                    int height = static_cast<int>(detection.at<float>(j, 3) * frame.rows);
//                    int left = centerX - width / 2;
//                    int top = centerY - height / 2;
//
//                    int classId = classIdPoint.x;
//                    std::string label = classes[classId];
//
//                    cv::Rect bbox(left, top, width, height);
//                    bool overlapping = false;
//
//                    for (const cv::Rect& existingBox : finalBoundingBoxes)
//                    {
//                        cv::Rect intersection = bbox & existingBox;
//                        float overlap = static_cast<float>(intersection.area()) / static_cast<float>((bbox.area() + existingBox.area() - intersection.area()));
//                        
//                        if (overlap > nmsThreshold)
//                        {
//                            overlapping = true;
//                            break;
//                        }
//                    }
//
//                    if (!overlapping)
//                    {
//                        finalBoundingBoxes.push_back(bbox);
//                        cv::rectangle(frame, bbox, cv::Scalar(0, 255, 0), 2);
//                        cv::putText(frame, label, cv::Point(left, top - 10), cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(0, 255, 0), 2);
//                    }
//                }
//            }
//        }
//
//        cv::imshow("Object Detection", frame);
//        if (cv::waitKey(1) == 27) // Press ESC to exit the loop.
//            break;
//    }
//
//    return 0;
//}
//////////////////////////////////////////////////////////////////////yolov3_custom_2000.weights
//code below is yolo for image
//int main()
//{
//	//here is for obama
//	//cv::dnn::Net net = cv::dnn::readNet("E:/Downloads/yolov3_custom_final.weights", "E:/Downloads/OIDv4_ToolKit-master/OIDv4_ToolKit-master/yolov3_custom (1).cfg");
//	cv::dnn::Net net = cv::dnn::readNet("E:/Downloads/yolov3_custom_2000.weights", "E:/Downloads/OIDv4_ToolKit-master/OIDv4_ToolKit-master/yolov3_custom (1).cfg");
//
//	std::vector<std::string> classes;
//	std::ifstream classNamesFile("E:/Downloads/OIDv4_ToolKit-master/OIDv4_ToolKit-master/obj2.names");
//
//	if (classNamesFile.is_open())
//	{
//		std::string className;
//		while (getline(classNamesFile, className))
//		{
//			classes.push_back(className);
//		}
//	}
//
//	// Load the image from a file
//	cv::Mat frame = cv::imread("E:/Downloads/glove06.jpg"); // Replace "path_to_your_local_image.jpg" with the actual path to your image.
//
//	if (frame.empty())
//	{
//		std::cerr << "Error: Could not read the image." << std::endl;
//		return -1;
//	}
//
//	int inputWidth = 416;
//	int inputHeight = 416;
//
//	cv::Mat blob = cv::dnn::blobFromImage(frame, 1 / 255.0, cv::Size(inputWidth, inputHeight), cv::Scalar(0, 0, 0), true, false);
//	net.setInput(blob);
//
//	std::vector<cv::String> outLayerNames = net.getUnconnectedOutLayersNames();
//
//	std::vector<cv::Mat> detectionMat;
//	net.forward(detectionMat, outLayerNames);
//
//	float confThreshold = 0.5;
//
//	std::vector<cv::Rect> finalBoundingBoxes;
//	float nmsThreshold = 0.4;
//
//	for (size_t i = 0; i < detectionMat.size(); ++i)
//	{
//		cv::Mat detection = detectionMat[i];
//		for (int j = 0; j < detection.rows; ++j)
//		{
//			cv::Mat scores = detection.row(j).colRange(5, detection.cols);
//			cv::Point classIdPoint;
//			double confidence;
//			cv::minMaxLoc(scores, 0, &confidence, 0, &classIdPoint);
//
//			if (confidence > confThreshold)
//			{
//				int centerX = static_cast<int>(detection.at<float>(j, 0) * frame.cols);
//				int centerY = static_cast<int>(detection.at<float>(j, 1) * frame.rows);
//				int width = static_cast<int>(detection.at<float>(j, 2) * frame.cols);
//				int height = static_cast<int>(detection.at<float>(j, 3) * frame.rows);
//				int left = centerX - width / 2;
//				int top = centerY - height / 2;
//
//				int classId = classIdPoint.x;
//				std::string label = classes[classId];
//
//				cv::Rect bbox(left, top, width, height);
//				bool overlapping = false;
//
//				for (const cv::Rect& existingBox : finalBoundingBoxes)
//				{
//					cv::Rect intersection = bbox & existingBox;
//					float overlap = static_cast<float>(intersection.area()) / static_cast<float>((bbox.area() + existingBox.area() - intersection.area()));
//
//					if (overlap > nmsThreshold)
//					{
//						overlapping = true;
//						break;
//					}
//				}
//
//				if (!overlapping)
//				{
//					finalBoundingBoxes.push_back(bbox);
//					cv::rectangle(frame, bbox, cv::Scalar(0, 255, 0), 2);
//					cv::putText(frame, label, cv::Point(left, top - 10), cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(0, 255, 0), 2);
//				}
//			}
//		}
//	}
//
//	cv::imshow("Object Detection", frame);
//	cv::waitKey(0); // Wait indefinitely until a key is pressed to close the window.
//
//	return 0;
//}
//////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////Making Shock Proof Gloves
//yolo for video 
//std::ifstream classNamesFile("E:/Downloads/glove00.mp4");
//cv::VideoCapture video("E:/Downloads/glove00.mp4");
//
//
//int main()
//{
//	//cv::dnn::Net net = cv::dnn::readNet("E:/Downloads/yolov3_custom_2000.weights", "E:/Downloads/OIDv4_ToolKit-master/OIDv4_ToolKit-master/yolov3_custom (1).cfg");
//
//	cv::dnn::Net net = cv::dnn::readNet("E:/Downloads/yolov3_custom_final (1).weights", "E:/Downloads/OIDv4_ToolKit-master/OIDv4_ToolKit-master/yolov3_custom (1).cfg");
//
//	std::vector<std::string> classes;
//	std::ifstream classNamesFile("E:/Downloads/OIDv4_ToolKit-master/OIDv4_ToolKit-master/obj2.names");
//
//	if (classNamesFile.is_open())
//	{
//		std::string className;
//		while (getline(classNamesFile, className))
//		{
//			classes.push_back(className);
//		}
//	}
//
//	cv::VideoCapture cap("E:/Downloads/glove00.mp4"); // Replace "your_custom_video.mp4" with the path to your custom video file.
//
//	if (!cap.isOpened())
//	{
//		std::cerr << "Error: Could not open the video file." << std::endl;
//		return -1;
//	}
//
//	int inputWidth = 416;
//	int inputHeight = 416;
//
//	std::ofstream outputFile("detection_results.txt");
//
//	if (!outputFile.is_open())
//	{
//		std::cerr << "Error: Could not open the output file." << std::endl;
//		return -1;
//	}
//
//	while (true)
//	{
//		cv::Mat frame;
//		cap >> frame; // Read a frame from the video file.
//
//		if (frame.empty())
//		{
//			std::cerr << "End of video." << std::endl;
//			break;
//		}
//
//		cv::Mat blob = cv::dnn::blobFromImage(frame, 1 / 255.0, cv::Size(inputWidth, inputHeight), cv::Scalar(0, 0, 0), true, false);
//		net.setInput(blob);
//
//		std::vector<cv::String> outLayerNames = net.getUnconnectedOutLayersNames();
//
//		std::vector<cv::Mat> detectionMat;
//		net.forward(detectionMat, outLayerNames);
//
//		float confThreshold = 0.5;
//
//		std::vector<cv::Rect> finalBoundingBoxes;
//		float nmsThreshold = 0.4;
//
//		for (size_t i = 0; i < detectionMat.size(); ++i)
//		{
//			cv::Mat detection = detectionMat[i];
//			for (int j = 0; j < detection.rows; ++j)
//			{
//				cv::Mat scores = detection.row(j).colRange(5, detection.cols);
//				cv::Point classIdPoint;
//				double confidence;
//				cv::minMaxLoc(scores, 0, &confidence, 0, &classIdPoint);
//
//				if (confidence > confThreshold)
//				{
//					int centerX = static_cast<int>(detection.at<float>(j, 0) * frame.cols);
//					int centerY = static_cast<int>(detection.at<float>(j, 1) * frame.rows);
//					int width = static_cast<int>(detection.at<float>(j, 2) * frame.cols);
//					int height = static_cast<int>(detection.at<float>(j, 3) * frame.rows);
//					int left = centerX - width / 2;
//					int top = centerY - height / 2;
//
//					int classId = classIdPoint.x;
//					std::string label = classes[classId];
//
//					cv::Rect bbox(left, top, width, height);
//					bool overlapping = false;
//
//					for (const cv::Rect& existingBox : finalBoundingBoxes)
//					{
//						cv::Rect intersection = bbox & existingBox;
//						float overlap = static_cast<float>(intersection.area()) / static_cast<float>((bbox.area() + existingBox.area() - intersection.area()));
//
//						if (overlap > nmsThreshold)
//						{
//							overlapping = true;
//							break;
//						}
//					}
//
//					if (!overlapping)
//					{
//						finalBoundingBoxes.push_back(bbox);
//
//						// Write detection results to the text file
//						outputFile << "Label: " << label << ", Confidence: " << confidence
//							<< ", BBox: (" << bbox.x << ", " << bbox.y << ", " << bbox.width << ", " << bbox.height << ")" << std::endl;
//
//						cv::rectangle(frame, bbox, cv::Scalar(0, 255, 0), 2);
//						cv::putText(frame, label, cv::Point(left, top - 10), cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(0, 255, 0), 2);
//					}
//				}
//			}
//		}
//
//		cv::imshow("Object Detection", frame);
//		if (cv::waitKey(1) == 27) // Press 'ESC' to exit the loop.
//			break;
//	}
//	return 0;
//}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////Code below should be delete 
//// cv::Mat frame = cv::imread("E:/Downloads/gloveTest.jpg");  // Replace with the path to your image file.
//#include <opencv2/opencv.hpp>
//#include <opencv2/dnn.hpp>
//#include <fstream>
//#include <iostream>
//#include <vector>
//#include <chrono>
//
//using namespace cv;
//using namespace cv::dnn;
//
//int main()
//{
//	cv::dnn::Net net = cv::dnn::readNet("E:/Downloads/yolov3_custom_final (1).weights", "E:/Downloads/OIDv4_ToolKit-master/OIDv4_ToolKit-master/yolov3_custom (1).cfg");
//
//	std::vector<std::string> classes;
//	std::ifstream classNamesFile("E:/Downloads/OIDv4_ToolKit-master/OIDv4_ToolKit-master/obj2.names");
//
//	if (classNamesFile.is_open())
//	{
//		std::string className;
//		while (getline(classNamesFile, className))
//		{
//			classes.push_back(className);
//		}
//	}
//
//	// Load the source image
//	cv::Mat frame = cv::imread("E:/Downloads/gloveTest.jpg");
//
//	if (frame.empty())
//	{
//		std::cerr << "Error: Could not open the image file." << std::endl;
//		return -1;
//	}
//
//	int inputWidth = 416;
//	int inputHeight = 416;
//
//	cv::Mat blob = cv::dnn::blobFromImage(frame, 1 / 255.0, cv::Size(inputWidth, inputHeight), cv::Scalar(0, 0, 0), true, false);
//	net.setInput(blob);
//
//	std::vector<cv::String> outLayerNames = net.getUnconnectedOutLayersNames();
//
//	std::vector<cv::Mat> detectionMat;
//	net.forward(detectionMat, outLayerNames);
//
//	float confThreshold = 0.5;
//
//	std::vector<cv::Rect> finalBoundingBoxes;
//	float nmsThreshold = 0.4;
//
//	std::ofstream outputFile("detection_results.txt");
//
//	if (!outputFile.is_open())
//	{
//		std::cerr << "Error: Could not open the output file." << std::endl;
//		return -1;
//	}
//
//	for (size_t i = 0; i < detectionMat.size(); ++i)
//	{
//		cv::Mat detection = detectionMat[i];
//		for (int j = 0; j < detection.rows; ++j)
//		{
//			cv::Mat scores = detection.row(j).colRange(5, detection.cols);
//			cv::Point classIdPoint;
//			double confidence;
//			cv::minMaxLoc(scores, 0, &confidence, 0, &classIdPoint);
//
//			if (confidence > confThreshold)
//			{
//				int centerX = static_cast<int>(detection.at<float>(j, 0) * frame.cols);
//				int centerY = static_cast<int>(detection.at<float>(j, 1) * frame.rows);
//				int width = static_cast<int>(detection.at<float>(j, 2) * frame.cols);
//				int height = static_cast<int>(detection.at<float>(j, 3) * frame.rows);
//				int left = centerX - width / 2;
//				int top = centerY - height / 2;
//
//				int classId = classIdPoint.x;
//				std::string label = classes[classId];
//
//				cv::Rect bbox(left, top, width, height);
//				bool overlapping = false;
//
//				for (const cv::Rect& existingBox : finalBoundingBoxes)
//				{
//					cv::Rect intersection = bbox & existingBox;
//					float overlap = static_cast<float>(intersection.area()) / static_cast<float>((bbox.area() + existingBox.area() - intersection.area()));
//
//					if (overlap > nmsThreshold)
//					{
//						overlapping = true;
//						break;
//					}
//				}
//
//				if (!overlapping)
//				{
//					finalBoundingBoxes.push_back(bbox);
//
//					// Write detection results to the text file
//					outputFile << "Label: " << label << ", Confidence: " << confidence
//						<< ", BBox: (" << bbox.x << ", " << bbox.y << ", " << bbox.width << ", " << bbox.height << ")" << std::endl;
//
//					cv::rectangle(frame, bbox, cv::Scalar(0, 255, 0), 2);
//					cv::putText(frame, label, cv::Point(left, top - 10), cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(0, 255, 0), 2);
//				}
//			}
//		}
//	}
//
//	outputFile.close();
//
//	auto start_time = std::chrono::high_resolution_clock::now();
//	const int max_run_time_seconds = 10;
//
//	while (true)
//	{
//		auto current_time = std::chrono::high_resolution_clock::now();
//		auto elapsed_time = std::chrono::duration_cast<std::chrono::seconds>(current_time - start_time).count();
//
//		if (elapsed_time >= max_run_time_seconds)
//		{
//			std::cout << "Exiting due to timeout." << std::endl;
//			break;
//		}
//		cv::imshow("Object Detection", frame);
//		int key = cv::waitKey(1);  // Use a small wait time to allow the program to check the elapsed time.
//
//	}
//	//cv::imshow("Object Detection", frame);
//	//cv::waitKey(0);  // Wait until a key is pressed to close the window.
//
//	return 0;
//}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
#include <opencv2/opencv.hpp>
#include <opencv2/dnn.hpp>
#include <fstream>
#include <iostream>
#include <vector>
#include <chrono>

using namespace cv;
using namespace cv::dnn;

int main()
{
	//cv::dnn::Net net = cv::dnn::readNet("E:/Downloads/yolov3_custom_final (1).weights", "E:/Downloads/OIDv4_ToolKit-master/OIDv4_ToolKit-master/yolov3_custom (1).cfg");

	//std::vector<std::string> classes;
	//std::ifstream classNamesFile("E:/Downloads/OIDv4_ToolKit-master/OIDv4_ToolKit-master/obj2.names");

	//if (classNamesFile.is_open())
	//{
	//	std::string className;
	//	while (getline(classNamesFile, className))
	//	{
	//		classes.push_back(className);
	//	}
	//}

	//get image directory from text file 

	std::ifstream imageLocationFile("F:/course/course/Luan Van 2/AI Code/test0/x64/Release/image_directory.txt");

	// Check if the file is open
	if (!imageLocationFile.is_open())
	{
		std::cerr << "Error: Could not open the image location file." << std::endl;
		return -1;
	}

	// Read the image location from the file
	std::string imageLocation;
	std::getline(imageLocationFile, imageLocation);

	// Print the image location
	std::cout << "Image Location: " << imageLocation << std::endl;


	//// Load the source image
	//cv::Mat frame = cv::imread("F:/course/course/Luan Van 2/AI Code/test0/x64/Release/downloaded-image.jpg");  // Replace with the path to your image file.
	cv::dnn::Net net = cv::dnn::readNet("E:/Downloads/yolov3_custom_final (3).weights", "E:/Downloads/OIDv4_ToolKit-master/OIDv4_ToolKit-master/yolov3_custom2.cfg");

	std::vector<std::string> classes;
	std::ifstream classNamesFile("E:/Downloads/OIDv4_ToolKit-master/OIDv4_ToolKit-master/obj3.names");

	if (classNamesFile.is_open())
	{
		std::string className;
		while (getline(classNamesFile, className))
		{
			classes.push_back(className);
		}
	}
	
	// Load the source image
	cv::Mat frame = cv::imread(imageLocation);  // Replace with the path to your image file.
	//cv::Mat frame = cv::imread("E:/Downloads/b3.jpg");  // Replace with the path to your image file.
	//cv::Mat frame = cv::imread("E:/Downloads/15_1_2024_18_1_34.jpg");  // Replace with the path to your image file.

	if (frame.empty())
	{
		std::cerr << "Error: Could not open the image file." << std::endl;
		return -1;
	}

	int inputWidth = 416;
	int inputHeight = 416;

	cv::Mat blob = cv::dnn::blobFromImage(frame, 1 / 255.0, cv::Size(inputWidth, inputHeight), cv::Scalar(0, 0, 0), true, false);
	net.setInput(blob);

	std::vector<cv::String> outLayerNames = net.getUnconnectedOutLayersNames();

	std::vector<cv::Mat> detectionMat;
	net.forward(detectionMat, outLayerNames);

	float confThreshold = 0.5;

	std::vector<cv::Rect> finalBoundingBoxes;
	float nmsThreshold = 0.4;

	//std::ofstream outputFile("detection_results.txt");
	std::ofstream outputFile("F:/course/course/Luan Van 2/AI Code/test0/x64/Release/detection_results.txt");

	if (!outputFile.is_open())
	{
		std::cerr << "Error: Could not open the output file." << std::endl;
		return -1;
	}

	for (size_t i = 0; i < detectionMat.size(); ++i)
	{
		cv::Mat detection = detectionMat[i];
		for (int j = 0; j < detection.rows; ++j)
		{
			cv::Mat scores = detection.row(j).colRange(5, detection.cols);
			cv::Point classIdPoint;
			double confidence;
			cv::minMaxLoc(scores, 0, &confidence, 0, &classIdPoint);

			if (confidence > confThreshold)
			{
				int centerX = static_cast<int>(detection.at<float>(j, 0) * frame.cols);
				int centerY = static_cast<int>(detection.at<float>(j, 1) * frame.rows);
				int width = static_cast<int>(detection.at<float>(j, 2) * frame.cols);
				int height = static_cast<int>(detection.at<float>(j, 3) * frame.rows);
				int left = centerX - width / 2;
				int top = centerY - height / 2;

				int classId = classIdPoint.x;
				std::string label = classes[classId];

				cv::Rect bbox(left, top, width, height);
				bool overlapping = false;

				for (const cv::Rect& existingBox : finalBoundingBoxes)
				{
					cv::Rect intersection = bbox & existingBox;
					float overlap = static_cast<float>(intersection.area()) / static_cast<float>((bbox.area() + existingBox.area() - intersection.area()));

					if (overlap > nmsThreshold)
					{
						overlapping = true;
						break;
					}
				}

				if (!overlapping)
				{
					finalBoundingBoxes.push_back(bbox);

					// Write detection results to the text file
					outputFile << "Label: " << label << ", Confidence: " << confidence
						<< ", BBox: (" << bbox.x << ", " << bbox.y << ", " << bbox.width << ", " << bbox.height << ")" << std::endl;

					cv::rectangle(frame, bbox, cv::Scalar(0, 255, 0), 2);
					cv::putText(frame, label, cv::Point(left, top - 10), cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(0, 255, 0), 2);
				}
			}
		}
	}

	outputFile.close();

	
	auto start_time = std::chrono::high_resolution_clock::now();
	const int max_run_time_seconds = 5;

	while (true)
	{
		auto current_time = std::chrono::high_resolution_clock::now();
		auto elapsed_time = std::chrono::duration_cast<std::chrono::seconds>(current_time - start_time).count();

		if (elapsed_time >= max_run_time_seconds)
		{
			std::cout << "Exiting due to timeout." << std::endl;
			break;
		}
		cv::imshow("Object Detection", frame);
		int key = cv::waitKey(1);  // Use a small wait time to allow the program to check the elapsed time.

	}

	//cv::imshow("Object Detection", frame);
	//cv::waitKey(0);  // Wait until a key is pressed to close the window.

	return 0;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//code below is yolo for webcam
//
//int main()
//{
//
//
//	cv::dnn::Net net = cv::dnn::readNet("E:/Downloads/yolov3_custom_final (3).weights", "E:/Downloads/OIDv4_ToolKit-master/OIDv4_ToolKit-master/yolov3_custom2.cfg");
//
//	std::vector<std::string> classes;
//	std::ifstream classNamesFile("E:/Downloads/OIDv4_ToolKit-master/OIDv4_ToolKit-master/obj3.names");
//
//
//
//	if (classNamesFile.is_open())
//	{
//		std::string className;
//		while (getline(classNamesFile, className))
//		{
//			classes.push_back(className);
//		}
//	}
//
//	cv::VideoCapture cap(0); // Open the default camera (0) or specify the camera's index if you have multiple cameras.
//
//	if (!cap.isOpened())
//	{
//		std::cerr << "Error: Could not open the webcam." << std::endl;
//		return -1;
//	}
//
//	int inputWidth = 416;
//	int inputHeight = 416;
//
//	while (true)
//	{
//		cv::Mat frame;
//		cap >> frame; // Capture a frame from the webcam.
//
//		if (frame.empty())
//		{
//			std::cerr << "Error: Could not read a frame from the webcam." << std::endl;
//			break;
//		}
//
//		cv::Mat blob = cv::dnn::blobFromImage(frame, 1 / 255.0, cv::Size(inputWidth, inputHeight), cv::Scalar(0, 0, 0), true, false);
//		net.setInput(blob);
//
//		std::vector<cv::String> outLayerNames = net.getUnconnectedOutLayersNames();
//
//		std::vector<cv::Mat> detectionMat;
//		net.forward(detectionMat, outLayerNames);
//
//		float confThreshold = 0.5;
//
//		std::vector<cv::Rect> finalBoundingBoxes;
//		float nmsThreshold = 0.4;
//
//		for (size_t i = 0; i < detectionMat.size(); ++i)
//		{
//			cv::Mat detection = detectionMat[i];
//			for (int j = 0; j < detection.rows; ++j)
//			{
//				cv::Mat scores = detection.row(j).colRange(5, detection.cols);
//				cv::Point classIdPoint;
//				double confidence;
//				cv::minMaxLoc(scores, 0, &confidence, 0, &classIdPoint);
//
//				if (confidence > confThreshold)
//				{
//					int centerX = static_cast<int>(detection.at<float>(j, 0) * frame.cols);
//					int centerY = static_cast<int>(detection.at<float>(j, 1) * frame.rows);
//					int width = static_cast<int>(detection.at<float>(j, 2) * frame.cols);
//					int height = static_cast<int>(detection.at<float>(j, 3) * frame.rows);
//					int left = centerX - width / 2;
//					int top = centerY - height / 2;
//
//					int classId = classIdPoint.x;
//					std::string label = classes[classId];
//
//					cv::Rect bbox(left, top, width, height);
//					bool overlapping = false;
//
//					for (const cv::Rect& existingBox : finalBoundingBoxes)
//					{
//						cv::Rect intersection = bbox & existingBox;
//						float overlap = static_cast<float>(intersection.area()) / static_cast<float>((bbox.area() + existingBox.area() - intersection.area()));
//
//						if (overlap > nmsThreshold)
//						{
//							overlapping = true;
//							break;
//						}
//					}
//
//					if (!overlapping)
//					{
//						finalBoundingBoxes.push_back(bbox);
//						cv::rectangle(frame, bbox, cv::Scalar(0, 255, 0), 2);
//						cv::putText(frame, label, cv::Point(left, top - 10), cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(0, 255, 0), 2);
//					}
//				}
//			}
//		}
//
//		cv::imshow("Object Detection", frame);
//		if (cv::waitKey(1) == 27) // Press ESC to exit the loop.
//			break;
//	}
//
//	return 0;
//}