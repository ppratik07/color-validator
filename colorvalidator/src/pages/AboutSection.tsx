import React from "react";
const AboutSection = () => {
    return (
      <section className="py-16 px-6 bg-gradient-to-b from-blue-50 to-white -m-14">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900">
            About Smart Package Color Validator
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Ensure your packaging colors meet brand standards with precision. Our tool helps businesses maintain brand integrity by verifying color accuracy across production runs.
          </p>
        </div>
  
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
            <span className="h-10 w-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
              📤
            </span>
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Easy Image Upload</h3>
              <p className="text-gray-600 text-sm">
                Drag-and-drop interface for instant analysis.
              </p>
            </div>
          </div>
  
          <div className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
            <span className="h-10 w-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
              🎨
            </span>
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Color Comparison</h3>
              <p className="text-gray-600 text-sm">
                Detects color variations and compares them against brand guidelines.
              </p>
            </div>
          </div>
  
          {/* <div className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
            <span className="h-10 w-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
              📊
            </span>
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Analytics Dashboard</h3>
              <p className="text-gray-600 text-sm">
                Tracks color consistency over time.
              </p>
            </div>
          </div> */}
  
          <div className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
            <span className="h-10 w-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
              ⚙️
            </span>
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Adjustable Tolerances</h3>
              <p className="text-gray-600 text-sm">
                Set tolerance levels based on brand requirements.
              </p>
            </div>
          </div>
  
          <div className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
            <span className="h-10 w-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
              ⏳
            </span>
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Real-Time Validation</h3>
              <p className="text-gray-600 text-sm">
                Provides immediate feedback on color accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutSection;
  