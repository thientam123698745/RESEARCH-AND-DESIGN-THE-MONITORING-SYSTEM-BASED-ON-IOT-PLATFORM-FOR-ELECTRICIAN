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
	cv::dnn::Net net = cv::dnn::readNet("E:/Downloads/yolov3_custom_last (4).weights", "E:/Downloads/OIDv4_ToolKit-master/OIDv4_ToolKit-master/yolov3_custom2.cfg");

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
	//cv::Mat frame = cv::imread("E:/Downloads/3_1_2024_10_12_1.jpg");  // Replace with the path to your image file.

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
///////////////////////