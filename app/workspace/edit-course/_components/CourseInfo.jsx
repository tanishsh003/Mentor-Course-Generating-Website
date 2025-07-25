import React, { useState } from 'react'

const CourseInfo =  ({course}) => {

  if (!course) {
    return <div>Loading course information...</div>;
  }

  let courseLayout;

  try {
    // 1. Get the JSON string directly from course.courseJson
    let jsonString = course.courseJson;

    // 2. Clean the string to remove the markdown code block fences
    // This removes "```json\n" from the start and "\n```" from the end
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.replace(/^```json\n/, '').replace(/\n```$/, '');
    }

    // 3. Parse the cleaned string
    const courseData = JSON.parse(jsonString);
    
    // 4. Access the final course layout object
    courseLayout = courseData?.course;

  } catch (error) {
    console.error("Failed to parse courseJson:", error);
    return <div>There was an error displaying the course data.</div>;
  }

  if (!courseLayout) {
    return <div>Could not find course details in the data.</div>;
  }

  return (
    <div>
      <div>
        <h2 className='font-bold text-2xl'>{courseLayout.name} </h2>
        <p className='line-clamp-2'>{courseLayout.description} </p>

      </div>
    </div>
  );
}

export default CourseInfo
