import { useState, useEffect } from 'react';
import { Calendar, CheckCircle, X, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

// Workout data by day
const workoutsByDay = {
  'Monday': {
    title: 'Full Body Strength',
    exercises: [
      { name: 'Push-ups', sets: 3, reps: '15-20' },
      { name: 'Bodyweight Squats', sets: 3, reps: '20' },
      { name: 'Plank', sets: 3, reps: '30 sec' },
      { name: 'Lunges', sets: 3, reps: '12/leg' },
      { name: 'Mountain Climbers', sets: 3, reps: '30 sec' }
    ]
  },
  'Tuesday': {
    title: 'Low-Energy Mobility & Stretching',
    exercises: [
      { name: 'Neck rolls, shoulder rolls', sets: 1, reps: '1 min each' },
      { name: 'Cat-Cow stretch', sets: 1, reps: '1 min' },
      { name: 'Hip openers', sets: 1, reps: '2 min' },
      { name: 'Child\'s pose', sets: 1, reps: '1 min' },
      { name: 'Forward fold', sets: 1, reps: '1 min' },
      { name: 'Deep breathing', sets: 1, reps: '3 min' }
    ]
  },
  'Wednesday': {
    title: 'Upper Body Focus',
    exercises: [
      { name: 'Push-ups', sets: 3, reps: '20-25' },
      { name: 'Triceps Dips (using chair/bed)', sets: 3, reps: '12' },
      { name: 'Plank Shoulder Taps', sets: 3, reps: '20' },
      { name: 'Superman Hold', sets: 3, reps: '30 sec' },
      { name: 'Arm Circles', sets: 1, reps: '2 min' }
    ]
  },
  'Thursday': {
    title: 'Lower Body + Core',
    exercises: [
      { name: 'Squats', sets: 4, reps: '15-20' },
      { name: 'Wall Sit', sets: 3, reps: '45 sec' },
      { name: 'Glute Bridges', sets: 3, reps: '15' },
      { name: 'Leg Raises', sets: 3, reps: '12' },
      { name: 'Russian Twists', sets: 3, reps: '20' }
    ]
  },
  'Friday': {
    title: 'Light Yoga & Recovery',
    exercises: [
      { name: 'Sun Salutations', sets: 3, reps: 'rounds' },
      { name: 'Seated Forward Fold', sets: 1, reps: '2 min' },
      { name: 'Supine Twist', sets: 1, reps: '1 min/side' },
      { name: 'Happy Baby Pose', sets: 1, reps: '1 min' },
      { name: 'Box Breathing', sets: 1, reps: '5 min' }
    ]
  },
  'Saturday': {
    title: 'Mixed Intensity Circuit',
    exercises: [
      { name: 'Push-ups', sets: 3, reps: '20' },
      { name: 'Squats', sets: 3, reps: '25' },
      { name: 'Burpees', sets: 3, reps: '10' },
      { name: 'Plank', sets: 3, reps: '45 sec' },
      { name: 'High Knees', sets: 3, reps: '30 sec' }
    ]
  },
  'Sunday': {
    title: 'Core & Flexibility',
    exercises: [
      { name: 'Leg Raises', sets: 3, reps: '15' },
      { name: 'Bicycle Crunches', sets: 3, reps: '20' },
      { name: 'Side Plank', sets: 2, reps: '30 sec/side' },
      { name: 'Cobra Stretch', sets: 1, reps: '1 min' },
      { name: 'Hamstring Stretch', sets: 1, reps: '1 min/leg' }
    ]
  }
};

// Helper function to get the day of the week from a date
const getDayOfWeek = (date) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

// Generate dates for the current month
const generateDatesForMonth = () => {
  const dates = [];
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(currentYear, currentMonth, i);
    dates.push({
      date,
      dayOfWeek: getDayOfWeek(date),
      formattedDate: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
      displayDate: `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
    });
  }
  
  return dates;
};

export function WorkoutPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [workoutProgress, setWorkoutProgress] = useState({});
  const [completedWorkouts, setCompletedWorkouts] = useState({});

  useEffect(() => {
    // Initialize with today's date
    const today = new Date();
    const todayFormatted = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setSelectedDate({
      date: today,
      dayOfWeek: getDayOfWeek(today),
      formattedDate: todayFormatted,
      displayDate: `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`
    });
    
    // Generate dates for the current month
    setDates(generateDatesForMonth());
    
    // Load saved progress from localStorage if available
    const savedProgress = localStorage.getItem('workoutProgress');
    if (savedProgress) {
      setWorkoutProgress(JSON.parse(savedProgress));
    }
    
    const savedCompleted = localStorage.getItem('completedWorkouts');
    if (savedCompleted) {
      setCompletedWorkouts(JSON.parse(savedCompleted));
    }
  }, []);

  useEffect(() => {
    // Save progress to localStorage whenever it changes
    if (Object.keys(workoutProgress).length > 0) {
      localStorage.setItem('workoutProgress', JSON.stringify(workoutProgress));
    }
  }, [workoutProgress]);

  useEffect(() => {
    // Save completed workouts to localStorage whenever it changes
    if (Object.keys(completedWorkouts).length > 0) {
      localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts));
    }
  }, [completedWorkouts]);

  // Handle month navigation
  const changeMonth = (increment) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
    
    // Update dates for the new month
    const newDates = [];
    const newMonthYear = newMonth.getFullYear();
    const newMonthMonth = newMonth.getMonth();
    
    const firstDay = new Date(newMonthYear, newMonthMonth, 1);
    const lastDay = new Date(newMonthYear, newMonthMonth + 1, 0);
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(newMonthYear, newMonthMonth, i);
      newDates.push({
        date,
        dayOfWeek: getDayOfWeek(date),
        formattedDate: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
        displayDate: `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
      });
    }
    
    setDates(newDates);
  };

  // Check if the date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Handle exercise completion
  const handleExerciseProgress = (exerciseName, completed) => {
    if (!selectedDate) return;

    setWorkoutProgress(prev => {
      const dateKey = selectedDate.formattedDate;
      const prevDateProgress = prev[dateKey] || {};
      
      return {
        ...prev,
        [dateKey]: {
          ...prevDateProgress,
          [exerciseName]: completed
        }
      };
    });

    // Check if all exercises are completed for this date
    const currentWorkout = workoutsByDay[selectedDate.dayOfWeek];
    
    if (currentWorkout) {
      setTimeout(() => {
        const updatedProgress = {
          ...workoutProgress,
          [selectedDate.formattedDate]: {
            ...(workoutProgress[selectedDate.formattedDate] || {}),
            [exerciseName]: completed
          }
        };
        
        const allCompleted = currentWorkout.exercises.every(
          exercise => updatedProgress[selectedDate.formattedDate]?.[exercise.name] === true
        );
        
        if (allCompleted) {
          setCompletedWorkouts(prev => ({
            ...prev,
            [selectedDate.formattedDate]: true
          }));
        } else {
          // Check if any exercise is marked as failed
          const anyFailed = currentWorkout.exercises.some(
            exercise => updatedProgress[selectedDate.formattedDate]?.[exercise.name] === false
          );
          
          if (anyFailed) {
            setCompletedWorkouts(prev => ({
              ...prev,
              [selectedDate.formattedDate]: false
            }));
          }
        }
      }, 100);
    }
  };

  // Calculate workout completion status and percentage
  const calculateCompletion = () => {
    if (!selectedDate) return { completed: 0, total: 0, percentage: 0 };
    
    const dateKey = selectedDate.formattedDate;
    const currentWorkout = workoutsByDay[selectedDate.dayOfWeek];
    
    if (!currentWorkout) return { completed: 0, total: 0, percentage: 0 };
    
    const total = currentWorkout.exercises.length;
    const completed = currentWorkout.exercises.filter(
      exercise => workoutProgress[dateKey]?.[exercise.name] === true
    ).length;
    
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { completed, total, percentage };
  };

  const completion = calculateCompletion();
  const today = new Date();
  const canPerformWorkout = selectedDate ? 
    selectedDate.date.getDate() === today.getDate() && 
    selectedDate.date.getMonth() === today.getMonth() && 
    selectedDate.date.getFullYear() === today.getFullYear() : false;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <h1 className="text-2xl font-bold">Cyral Workout Tracker</h1>
        <div className="flex items-center">
          <Calendar className="w-6 h-6 mr-2" />
          <span>{selectedDate ? selectedDate.displayDate : 'Select a date'}</span>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Calendar sidebar - 1 part of the 1:5 ratio */}
        <div className="w-1/6 bg-gray-200 overflow-y-auto">
          <div className="p-3 bg-blue-500 text-white flex justify-between items-center">
            <button 
              onClick={() => changeMonth(-1)}
              className="p-1 hover:bg-blue-600 rounded"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-semibold">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button 
              onClick={() => changeMonth(1)}
              className="p-1 hover:bg-blue-600 rounded"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="divide-y divide-gray-300">
            {dates.map((dateObj) => (
              <div
                key={dateObj.formattedDate}
                className={`p-3 flex items-center cursor-pointer hover:bg-gray-300 ${
                  selectedDate?.formattedDate === dateObj.formattedDate ? 'bg-blue-100 border-l-4 border-blue-500' : ''
                } ${isToday(dateObj.date) ? 'font-bold' : ''}`}
                onClick={() => setSelectedDate(dateObj)}
              >
                <div className="flex-1">
                  <div className="text-sm">{dateObj.displayDate}</div>
                  <div className={`text-xs ${isToday(dateObj.date) ? 'text-blue-600' : 'text-gray-600'}`}>
                    {dateObj.dayOfWeek}
                  </div>
                </div>
                
                {completedWorkouts[dateObj.formattedDate] === true && (
                  <div className="ml-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                )}
                
                {completedWorkouts[dateObj.formattedDate] === false && (
                  <div className="ml-2 text-red-600">
                    <X className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Workout details - 5 parts of the 1:5 ratio */}
        <div className="w-5/6 p-6 overflow-y-auto">
          {selectedDate && workoutsByDay[selectedDate.dayOfWeek] ? (
            <div>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedDate.dayOfWeek} – {workoutsByDay[selectedDate.dayOfWeek].title}
                </h2>
                
                {completedWorkouts[selectedDate.formattedDate] === true && (
                  <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="font-bold">WORKOUT COMPLETED! AMAZING JOB!</span>
                  </div>
                )}
                
                {completedWorkouts[selectedDate.formattedDate] === false && (
                  <div className="px-4 py-2 bg-red-100 text-red-800 rounded-lg flex items-center">
                    <X className="w-5 h-5 mr-2" />
                    <span className="font-bold">KEEP TRYING! TOMORROW IS A NEW DAY!</span>
                  </div>
                )}
              </div>
              
              <div className="mb-6 bg-white rounded-lg shadow p-4">
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  <h3 className="text-lg font-semibold">Progress Tracker</h3>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div 
                    className={`h-4 rounded-full ${
                      completion.percentage === 100 ? 'bg-green-500' : 
                      completion.percentage > 50 ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${completion.percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600">
                  {completion.completed} of {completion.total} exercises completed ({completion.percentage}%)
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exercise</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sets</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reps</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {workoutsByDay[selectedDate.dayOfWeek].exercises.map((exercise, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exercise.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exercise.sets}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exercise.reps}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {canPerformWorkout ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleExerciseProgress(exercise.name, true)}
                                className={`px-3 py-1 rounded ${
                                  workoutProgress[selectedDate.formattedDate]?.[exercise.name] === true
                                    ? 'bg-green-500 text-white'
                                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                                }`}
                              >
                                Done
                              </button>
                              <button
                                onClick={() => handleExerciseProgress(exercise.name, false)}
                                className={`px-3 py-1 rounded ${
                                  workoutProgress[selectedDate.formattedDate]?.[exercise.name] === false
                                    ? 'bg-red-500 text-white'
                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                }`}
                              >
                                Skip
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400">
                              {workoutProgress[selectedDate.formattedDate]?.[exercise.name] === true
                                ? 'Completed'
                                : workoutProgress[selectedDate.formattedDate]?.[exercise.name] === false
                                ? 'Skipped'
                                : 'Not available'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {!canPerformWorkout && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800">
                    <strong>Note:</strong> You can only perform exercises scheduled for today. This workout is for preview only.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Calendar className="w-16 h-16 mb-4" />
              <p className="text-xl">Select a date to view your workout</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
