import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, ArrowLeft, RefreshCw } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: 'cognitive' | 'motor' | 'speech' | 'creative' | 'sensory';
  completed: boolean;
  emoji: string;
  interactive?: boolean;
  day: number;
}

interface ActivitiesZoneProps {
  childName: string;
  selectedPlan?: number; // days from therapist booking
}

const ActivitiesZone = ({ childName, selectedPlan = 30 }: ActivitiesZoneProps) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [activeActivity, setActiveActivity] = useState<Activity | null>(null);

  // Generate activities based on selected plan
  useEffect(() => {
    const generateActivities = (days: number) => {
      const baseActivities = [
        {
          title: 'Color Sorting Game',
          description: 'Sort colored balls into matching jars',
          duration: 15,
          category: 'cognitive' as const,
          emoji: '🔴',
          interactive: true
        },
        {
          title: 'Animal Name Game',
          description: 'Click on animals and learn their names',
          duration: 12,
          category: 'cognitive' as const,
          emoji: '🐶',
          interactive: true
        },
        {
          title: 'Alphabet Scribbling',
          description: 'Draw letters with colorful crayons',
          duration: 20,
          category: 'creative' as const,
          emoji: '✏️',
          interactive: true
        },
        {
          title: 'Shape Selection',
          description: 'Identify and name different shapes',
          duration: 10,
          category: 'cognitive' as const,
          emoji: '🔷',
          interactive: true
        },
        {
          title: 'Bird Selection Game',
          description: 'Click on birds and learn their names',
          duration: 15,
          category: 'sensory' as const,
          emoji: '🐦',
          interactive: true
        },
        {
          title: 'Balance Walk',
          description: 'Walk on a line maintaining balance',
          duration: 8,
          category: 'motor' as const,
          emoji: '🚶‍♀️'
        },
        {
          title: 'Number Counting',
          description: 'Count objects and match numbers',
          duration: 12,
          category: 'cognitive' as const,
          emoji: '🔢'
        },
        {
          title: 'Singing Time',
          description: 'Sing simple songs and rhymes',
          duration: 10,
          category: 'speech' as const,
          emoji: '🎵'
        }
      ];

      const generatedActivities: Activity[] = [];
      for (let day = 1; day <= days; day++) {
        const activityIndex = (day - 1) % baseActivities.length;
        const baseActivity = baseActivities[activityIndex];
        generatedActivities.push({
          id: `${day}-${activityIndex}`,
          ...baseActivity,
          completed: false,
          day: day
        });
      }
      return generatedActivities;
    };

    setActivities(generateActivities(selectedPlan));
  }, [selectedPlan]);

  const toggleActivity = (id: string) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === id 
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    );
  };

  const openActivity = (activity: Activity) => {
    if (activity.interactive) {
      setActiveActivity(activity);
    } else {
      toggleActivity(activity.id);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      cognitive: 'from-blue-400 to-purple-500',
      motor: 'from-green-400 to-teal-500',
      speech: 'from-yellow-400 to-orange-500',
      creative: 'from-pink-400 to-red-500',
      sensory: 'from-indigo-400 to-blue-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  const currentDayActivities = activities.filter(a => a.day === currentDay);
  const completedCount = currentDayActivities.filter(a => a.completed).length;

  // If interactive activity is active, show the interactive component
  if (activeActivity) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setActiveActivity(null)}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <h2 className="text-xl font-bold text-gray-800">
            {activeActivity.title}
          </h2>
        </div>
        
        {activeActivity.title === 'Color Sorting Game' && (
          <ColorSortingGame 
            onComplete={() => {
              toggleActivity(activeActivity.id);
              setActiveActivity(null);
            }}
          />
        )}
        
        {activeActivity.title === 'Animal Name Game' && (
          <AnimalNameGame 
            onComplete={() => {
              toggleActivity(activeActivity.id);
              setActiveActivity(null);
            }}
          />
        )}
        
        {activeActivity.title === 'Alphabet Scribbling' && (
          <AlphabetScribbling 
            onComplete={() => {
              toggleActivity(activeActivity.id);
              setActiveActivity(null);
            }}
          />
        )}
        
        {activeActivity.title === 'Shape Selection' && (
          <ShapeSelectionGame 
            onComplete={() => {
              toggleActivity(activeActivity.id);
              setActiveActivity(null);
            }}
          />
        )}
        
        {activeActivity.title === 'Bird Selection Game' && (
          <BirdSelectionGame 
            onComplete={() => {
              toggleActivity(activeActivity.id);
              setActiveActivity(null);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {childName}'s {selectedPlan}-Day Program 🌟
        </h2>
        
        {/* Day Navigation */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Button
            onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
            disabled={currentDay === 1}
            variant="outline"
            size="sm"
          >
            Previous
          </Button>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-2 rounded-xl">
            <span className="text-lg font-semibold text-gray-800">
              Day {currentDay} of {selectedPlan}
            </span>
          </div>
          <Button
            onClick={() => setCurrentDay(Math.min(selectedPlan, currentDay + 1))}
            disabled={currentDay === selectedPlan}
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-2xl">
          <p className="text-lg font-semibold text-gray-700">
            {completedCount} of {currentDayActivities.length} activities completed today!
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${currentDayActivities.length > 0 ? (completedCount / currentDayActivities.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Activities for Current Day */}
      <div className="space-y-4">
        {currentDayActivities.map((activity) => (
          <Card 
            key={activity.id} 
            className={`border-0 shadow-lg transition-all duration-300 ${
              activity.completed ? 'opacity-75 scale-95' : 'hover:shadow-xl'
            }`}
          >
            <CardContent className="p-0">
              <div className={`bg-gradient-to-r ${getCategoryColor(activity.category)} p-4 rounded-t-xl`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{activity.emoji}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{activity.title}</h3>
                      <div className="flex items-center text-white/80 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {activity.duration} min
                      </div>
                    </div>
                  </div>
                  {activity.completed && (
                    <div className="text-3xl animate-bounce">✅</div>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-white rounded-b-xl">
                <p className="text-gray-600 mb-4">{activity.description}</p>
                <Button
                  onClick={() => openActivity(activity)}
                  className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-200 ${
                    activity.completed
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : activity.interactive
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                  }`}
                >
                  {activity.completed 
                    ? '🎉 Great Job!' 
                    : activity.interactive 
                    ? '🎮 Play Activity'
                    : '🚀 Start Activity'
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Interactive Color Sorting Game Component
const ColorSortingGame = ({ onComplete }: { onComplete: () => void }) => {
  const [balls] = useState([
    { id: 1, color: 'red', name: 'Red' },
    { id: 2, color: 'blue', name: 'Blue' },
    { id: 3, color: 'green', name: 'Green' },
    { id: 4, color: 'yellow', name: 'Yellow' },
    { id: 5, color: 'purple', name: 'Purple' }
  ]);
  
  const [jarBalls, setJarBalls] = useState<typeof balls>([]);
  const [score, setScore] = useState(0);
  const [currentBall, setCurrentBall] = useState<typeof balls[0] | null>(null);

  const addBallToJar = (ball: typeof balls[0]) => {
    setJarBalls(prev => [...prev, ball]);
    setScore(prev => prev + 1);
    setCurrentBall(null);
    
    // Speak the color name
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`Great job! You picked ${ball.name}. Count: ${score + 1}`);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }

    if (score + 1 === balls.length) {
      setTimeout(() => {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance('Excellent! You sorted all the colors!');
          speechSynthesis.speak(utterance);
        }
        onComplete();
      }, 2000);
    }
  };

  const getBallColor = (color: string) => {
    const colors = {
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Color Sorting Game 🎯</h3>
        <p className="text-gray-600">Pick up the colored balls and put them in the jar!</p>
        <div className="text-3xl font-bold text-purple-600 mt-4">
          Count: {score} / {balls.length}
        </div>
      </div>

      {/* Available Balls */}
      <div className="bg-gray-100 p-6 rounded-2xl">
        <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">Pick a Ball</h4>
        <div className="flex flex-wrap justify-center gap-4">
          {balls.map((ball) => {
            const isUsed = jarBalls.some(jb => jb.id === ball.id);
            return (
              <button
                key={ball.id}
                onClick={() => !isUsed && setCurrentBall(ball)}
                disabled={isUsed}
                className={`w-16 h-16 rounded-full ${getBallColor(ball.color)} 
                  ${isUsed ? 'opacity-30' : 'hover:scale-110 active:scale-95'} 
                  transition-all duration-200 shadow-lg
                  ${currentBall?.id === ball.id ? 'ring-4 ring-white scale-110' : ''}
                `}
              />
            );
          })}
        </div>
      </div>

      {/* Selected Ball */}
      {currentBall && (
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            You picked: <span className="text-2xl font-bold" style={{ color: currentBall.color }}>
              {currentBall.name}
            </span>
          </p>
          <div className={`w-20 h-20 rounded-full ${getBallColor(currentBall.color)} mx-auto shadow-lg animate-bounce`} />
        </div>
      )}

      {/* Empty Jar */}
      <div className="bg-gradient-to-b from-transparent to-gray-200 p-8 rounded-2xl border-4 border-dashed border-gray-400 min-h-32">
        <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">Empty Jar</h4>
        <div className="flex flex-wrap justify-center gap-2 min-h-16">
          {jarBalls.map((ball, index) => (
            <div
              key={`${ball.id}-${index}`}
              className={`w-12 h-12 rounded-full ${getBallColor(ball.color)} shadow-md animate-pulse`}
            />
          ))}
        </div>
        
        {currentBall && (
          <div className="text-center mt-4">
            <Button
              onClick={() => addBallToJar(currentBall)}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl text-lg"
            >
              Put Ball in Jar! 🫙
            </Button>
          </div>
        )}
      </div>

      {score === balls.length && (
        <div className="text-center p-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-bold text-white">Amazing Job!</h3>
          <p className="text-white text-lg">You sorted all {balls.length} colors!</p>
        </div>
      )}
    </div>
  );
};

// Animal Name Game Component
const AnimalNameGame = ({ onComplete }: { onComplete: () => void }) => {
  const [animals] = useState([
    { id: 1, name: 'Dog', emoji: '🐶' },
    { id: 2, name: 'Cat', emoji: '🐱' },
    { id: 3, name: 'Lion', emoji: '🦁' },
    { id: 4, name: 'Elephant', emoji: '🐘' },
    { id: 5, name: 'Monkey', emoji: '🐵' }
  ]);
  
  const [score, setScore] = useState(0);
  const [selectedAnimals, setSelectedAnimals] = useState<number[]>([]);

  const selectAnimal = (animal: typeof animals[0]) => {
    if (selectedAnimals.includes(animal.id)) return;
    
    setSelectedAnimals(prev => [...prev, animal.id]);
    setScore(prev => prev + 1);
    
    // Speak the animal name
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`This is a ${animal.name}!`);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }

    if (score + 1 === animals.length) {
      setTimeout(() => {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance('Excellent! You learned all the animal names!');
          speechSynthesis.speak(utterance);
        }
        onComplete();
      }, 2000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Animal Name Game 🐾</h3>
        <p className="text-gray-600">Click on the animals to learn their names!</p>
        <div className="text-3xl font-bold text-green-600 mt-4">
          Animals Found: {score} / {animals.length}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {animals.map((animal) => {
          const isSelected = selectedAnimals.includes(animal.id);
          return (
            <button
              key={animal.id}
              onClick={() => selectAnimal(animal)}
              disabled={isSelected}
              className={`p-6 rounded-2xl transition-all duration-300 ${
                isSelected 
                  ? 'bg-green-200 scale-95 opacity-75' 
                  : 'bg-gradient-to-br from-yellow-100 to-orange-100 hover:scale-105 hover:shadow-lg'
              }`}
            >
              <div className="text-6xl mb-2">{animal.emoji}</div>
              <div className={`text-xl font-bold ${isSelected ? 'text-green-700' : 'text-gray-700'}`}>
                {isSelected ? animal.name : '?'}
              </div>
              {isSelected && <div className="text-2xl mt-2">✅</div>}
            </button>
          );
        })}
      </div>

      {score === animals.length && (
        <div className="text-center p-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-bold text-white">Amazing Job!</h3>
          <p className="text-white text-lg">You learned all {animals.length} animal names!</p>
        </div>
      )}
    </div>
  );
};

// Alphabet Scribbling Component
const AlphabetScribbling = ({ onComplete }: { onComplete: () => void }) => {
  const [currentLetter, setCurrentLetter] = useState('A');
  const [currentColor, setCurrentColor] = useState('red');
  const [completedLetters, setCompletedLetters] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
  const letters = ['A', 'B', 'C', 'D', 'E'];

  const getRandomColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCurrentColor(randomColor);
  };

  const startDrawing = () => {
    setIsDrawing(true);
    getRandomColor();
  };

  const finishLetter = () => {
    if (!completedLetters.includes(currentLetter)) {
      setCompletedLetters(prev => [...prev, currentLetter]);
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`Great job drawing the letter ${currentLetter}!`);
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }

      if (completedLetters.length + 1 === letters.length) {
        setTimeout(() => {
          if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('Excellent! You practiced all the letters!');
            speechSynthesis.speak(utterance);
          }
          onComplete();
        }, 2000);
      }
    }
    setIsDrawing(false);
  };

  const nextLetter = () => {
    const currentIndex = letters.indexOf(currentLetter);
    const nextIndex = (currentIndex + 1) % letters.length;
    setCurrentLetter(letters[nextIndex]);
    getRandomColor();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Alphabet Scribbling ✏️</h3>
        <p className="text-gray-600">Draw the letter with the given color!</p>
        <div className="text-3xl font-bold text-purple-600 mt-4">
          Letters Done: {completedLetters.length} / {letters.length}
        </div>
      </div>

      <div className="text-center">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">
          Draw the letter: <span className="text-4xl font-bold text-blue-600">{currentLetter}</span>
        </h4>
        <p className="text-lg mb-4">
          Use this color: <span 
            className="font-bold text-2xl" 
            style={{ color: currentColor }}
          >
            {currentColor.toUpperCase()}
          </span>
        </p>
      </div>

      {/* Drawing Area */}
      <div className="bg-white border-4 border-dashed border-gray-300 rounded-2xl p-8 min-h-64 flex flex-col items-center justify-center">
        <div className="text-8xl font-bold mb-4" style={{ color: currentColor, opacity: 0.3 }}>
          {currentLetter}
        </div>
        
        {!isDrawing ? (
          <Button
            onClick={startDrawing}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl text-lg"
          >
            Start Drawing! 🖍️
          </Button>
        ) : (
          <div className="text-center">
            <div className="text-2xl mb-4">✏️ Keep drawing...</div>
            <Button
              onClick={finishLetter}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl"
            >
              Finished Drawing!
            </Button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-4">
        <Button
          onClick={nextLetter}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Next Letter</span>
        </Button>
      </div>

      {/* Progress */}
      <div className="flex justify-center space-x-2">
        {letters.map((letter) => (
          <div
            key={letter}
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
              completedLetters.includes(letter)
                ? 'bg-green-500 text-white'
                : letter === currentLetter
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {letter}
          </div>
        ))}
      </div>

      {completedLetters.length === letters.length && (
        <div className="text-center p-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-bold text-white">Amazing Job!</h3>
          <p className="text-white text-lg">You practiced all {letters.length} letters!</p>
        </div>
      )}
    </div>
  );
};

// Shape Selection Game Component
const ShapeSelectionGame = ({ onComplete }: { onComplete: () => void }) => {
  const [shapes] = useState([
    { id: 1, name: 'Circle', emoji: '⭕', color: 'bg-red-400' },
    { id: 2, name: 'Square', emoji: '🟦', color: 'bg-blue-400' },
    { id: 3, name: 'Triangle', emoji: '🔺', color: 'bg-green-400' },
    { id: 4, name: 'Star', emoji: '⭐', color: 'bg-yellow-400' },
    { id: 5, name: 'Heart', emoji: '❤️', color: 'bg-pink-400' }
  ]);
  
  const [score, setScore] = useState(0);
  const [selectedShapes, setSelectedShapes] = useState<number[]>([]);

  const selectShape = (shape: typeof shapes[0]) => {
    if (selectedShapes.includes(shape.id)) return;
    
    setSelectedShapes(prev => [...prev, shape.id]);
    setScore(prev => prev + 1);
    
    // Speak the shape name
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`This is a ${shape.name}!`);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }

    if (score + 1 === shapes.length) {
      setTimeout(() => {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance('Excellent! You learned all the shape names!');
          speechSynthesis.speak(utterance);
        }
        onComplete();
      }, 2000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Shape Selection Game 🔷</h3>
        <p className="text-gray-600">Click on the shapes to learn their names!</p>
        <div className="text-3xl font-bold text-blue-600 mt-4">
          Shapes Found: {score} / {shapes.length}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {shapes.map((shape) => {
          const isSelected = selectedShapes.includes(shape.id);
          return (
            <button
              key={shape.id}
              onClick={() => selectShape(shape)}
              disabled={isSelected}
              className={`p-6 rounded-2xl transition-all duration-300 ${
                isSelected 
                  ? 'bg-green-200 scale-95 opacity-75' 
                  : `${shape.color} hover:scale-105 hover:shadow-lg`
              }`}
            >
              <div className="text-6xl mb-2">{shape.emoji}</div>
              <div className={`text-xl font-bold ${isSelected ? 'text-green-700' : 'text-white'}`}>
                {isSelected ? shape.name : '?'}
              </div>
              {isSelected && <div className="text-2xl mt-2">✅</div>}
            </button>
          );
        })}
      </div>

      {score === shapes.length && (
        <div className="text-center p-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-bold text-white">Amazing Job!</h3>
          <p className="text-white text-lg">You learned all {shapes.length} shape names!</p>
        </div>
      )}
    </div>
  );
};

// Bird Selection Game Component
const BirdSelectionGame = ({ onComplete }: { onComplete: () => void }) => {
  const [birds] = useState([
    { id: 1, name: 'Eagle', emoji: '🦅' },
    { id: 2, name: 'Owl', emoji: '🦉' },
    { id: 3, name: 'Parrot', emoji: '🦜' },
    { id: 4, name: 'Penguin', emoji: '🐧' },
    { id: 5, name: 'Flamingo', emoji: '🦩' }
  ]);
  
  const [score, setScore] = useState(0);
  const [selectedBirds, setSelectedBirds] = useState<number[]>([]);

  const selectBird = (bird: typeof birds[0]) => {
    if (selectedBirds.includes(bird.id)) return;
    
    setSelectedBirds(prev => [...prev, bird.id]);
    setScore(prev => prev + 1);
    
    // Speak the bird name
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`This is an ${bird.name}!`);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }

    if (score + 1 === birds.length) {
      setTimeout(() => {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance('Excellent! You learned all the bird names!');
          speechSynthesis.speak(utterance);
        }
        onComplete();
      }, 2000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Bird Selection Game 🐦</h3>
        <p className="text-gray-600">Click on the birds to learn their names!</p>
        <div className="text-3xl font-bold text-indigo-600 mt-4">
          Birds Found: {score} / {birds.length}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {birds.map((bird) => {
          const isSelected = selectedBirds.includes(bird.id);
          return (
            <button
              key={bird.id}
              onClick={() => selectBird(bird)}
              disabled={isSelected}
              className={`p-6 rounded-2xl transition-all duration-300 ${
                isSelected 
                  ? 'bg-green-200 scale-95 opacity-75' 
                  : 'bg-gradient-to-br from-sky-100 to-blue-100 hover:scale-105 hover:shadow-lg'
              }`}
            >
              <div className="text-6xl mb-2">{bird.emoji}</div>
              <div className={`text-xl font-bold ${isSelected ? 'text-green-700' : 'text-gray-700'}`}>
                {isSelected ? bird.name : '?'}
              </div>
              {isSelected && <div className="text-2xl mt-2">✅</div>}
            </button>
          );
        })}
      </div>

      {score === birds.length && (
        <div className="text-center p-6 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-2xl">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-bold text-white">Amazing Job!</h3>
          <p className="text-white text-lg">You learned all {birds.length} bird names!</p>
        </div>
      )}
    </div>
  );
};

export default ActivitiesZone;
