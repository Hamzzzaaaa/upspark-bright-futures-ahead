import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, ArrowLeft, RefreshCw } from 'lucide-react';
import { Canvas as FabricCanvas, PencilBrush } from 'fabric';

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
          title: 'Bird Coloring',
          description: 'Color beautiful birds with different colors',
          duration: 15,
          category: 'creative' as const,
          emoji: '🎨',
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
        
        {activeActivity.title === 'Bird Coloring' && (
          <BirdColoringGame 
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

// Updated Alphabet Scribbling Component with proper drawing functionality
const AlphabetScribbling = ({ onComplete }: { onComplete: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [currentLetter, setCurrentLetter] = useState('A');
  const [currentColor, setCurrentColor] = useState('#ff0000');
  const [completedLetters, setCompletedLetters] = useState<string[]>([]);
  
  const colors = ['#ff0000', '#0000ff', '#00ff00', '#ffff00', '#ff00ff', '#ffa500'];
  const letters = ['A', 'B', 'C', 'D', 'E'];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 400,
      height: 300,
      backgroundColor: '#ffffff',
    });

    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new PencilBrush(canvas);
    canvas.freeDrawingBrush.color = currentColor;
    canvas.freeDrawingBrush.width = 8;

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.color = currentColor;
    }
  }, [currentColor, fabricCanvas]);

  const getRandomColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCurrentColor(randomColor);
  };

  const clearCanvas = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = '#ffffff';
      fabricCanvas.renderAll();
    }
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
    clearCanvas();
  };

  const nextLetter = () => {
    const currentIndex = letters.indexOf(currentLetter);
    const nextIndex = (currentIndex + 1) % letters.length;
    setCurrentLetter(letters[nextIndex]);
    getRandomColor();
    clearCanvas();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Alphabet Scribbling ✏️</h3>
        <p className="text-gray-600">Draw the letter with your mouse or finger!</p>
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
            className="font-bold text-2xl inline-block w-8 h-8 rounded-full border-2 border-gray-400" 
            style={{ backgroundColor: currentColor }}
          ></span>
        </p>
      </div>

      {/* Drawing Canvas */}
      <div className="flex justify-center">
        <div className="bg-white border-4 border-dashed border-gray-300 rounded-2xl p-4">
          <canvas ref={canvasRef} className="border border-gray-200 rounded-xl" />
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <Button
          onClick={clearCanvas}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Clear</span>
        </Button>
        
        <Button
          onClick={finishLetter}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl"
        >
          Finished Drawing!
        </Button>
        
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

// NEW: Bird Coloring Game Component
const BirdColoringGame = ({ onComplete }: { onComplete: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [selectedColor, setSelectedColor] = useState('#ff0000');
  const [currentBird, setCurrentBird] = useState(0);
  const [coloredBirds, setColoredBirds] = useState<number[]>([]);
  
  const colors = [
    { name: 'Red', value: '#ff0000' },
    { name: 'Blue', value: '#0000ff' },
    { name: 'Green', value: '#00ff00' },
    { name: 'Yellow', value: '#ffff00' },
    { name: 'Purple', value: '#ff00ff' },
    { name: 'Orange', value: '#ffa500' }
  ];

  const birds = [
    { id: 1, name: 'Parrot', emoji: '🦜' },
    { id: 2, name: 'Eagle', emoji: '🦅' },
    { id: 3, name: 'Flamingo', emoji: '🦩' }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 400,
      height: 300,
      backgroundColor: '#ffffff',
    });

    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new PencilBrush(canvas);
    canvas.freeDrawingBrush.color = selectedColor;
    canvas.freeDrawingBrush.width = 12;

    // Draw bird outline
    drawBirdOutline(canvas);
    
    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [currentBird]);

  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.color = selectedColor;
    }
  }, [selectedColor, fabricCanvas]);

  const drawBirdOutline = (canvas: FabricCanvas) => {
    // Simple bird outline (you could make this more detailed)
    const ctx = canvas.getContext();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    // Bird body (oval)
    ctx.ellipse(200, 180, 80, 50, 0, 0, 2 * Math.PI);
    
    // Bird head (circle)
    ctx.ellipse(200, 120, 40, 40, 0, 0, 2 * Math.PI);
    
    // Beak (triangle)
    ctx.moveTo(160, 120);
    ctx.lineTo(140, 125);
    ctx.lineTo(160, 130);
    ctx.closePath();
    
    // Wing
    ctx.ellipse(180, 160, 30, 20, -0.5, 0, 2 * Math.PI);
    
    // Tail
    ctx.ellipse(280, 180, 40, 15, 0, 0, 2 * Math.PI);
    
    ctx.stroke();
  };

  const finishColoring = () => {
    if (!coloredBirds.includes(currentBird)) {
      setColoredBirds(prev => [...prev, currentBird]);
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`Beautiful coloring of the ${birds[currentBird].name}!`);
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }

      if (coloredBirds.length + 1 === birds.length) {
        setTimeout(() => {
          if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('Excellent! You colored all the birds!');
            speechSynthesis.speak(utterance);
          }
          onComplete();
        }, 2000);
      }
    }
  };

  const nextBird = () => {
    const nextIndex = (currentBird + 1) % birds.length;
    setCurrentBird(nextIndex);
    if (fabricCanvas) {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = '#ffffff';
      drawBirdOutline(fabricCanvas);
      fabricCanvas.renderAll();
    }
  };

  const clearCanvas = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = '#ffffff';
      drawBirdOutline(fabricCanvas);
      fabricCanvas.renderAll();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Bird Coloring 🎨</h3>
        <p className="text-gray-600">Color the beautiful birds with different colors!</p>
        <div className="text-3xl font-bold text-indigo-600 mt-4">
          Birds Colored: {coloredBirds.length} / {birds.length}
        </div>
      </div>

      <div className="text-center">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">
          Color the {birds[currentBird].name}: <span className="text-4xl">{birds[currentBird].emoji}</span>
        </h4>
      </div>

      {/* Color Palette */}
      <div className="flex justify-center space-x-2 mb-4">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => setSelectedColor(color.value)}
            className={`w-10 h-10 rounded-full border-4 transition-all duration-200 ${
              selectedColor === color.value ? 'border-gray-800 scale-110' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>

      {/* Drawing Canvas */}
      <div className="flex justify-center">
        <div className="bg-white border-4 border-dashed border-gray-300 rounded-2xl p-4">
          <canvas ref={canvasRef} className="border border-gray-200 rounded-xl" />
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <Button
          onClick={clearCanvas}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Clear</span>
        </Button>
        
        <Button
          onClick={finishColoring}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl"
        >
          Finished Coloring!
        </Button>
        
        <Button
          onClick={nextBird}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Next Bird</span>
        </Button>
      </div>

      {/* Progress */}
      <div className="flex justify-center space-x-2">
        {birds.map((bird, index) => (
          <div
            key={bird.id}
            className={`w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold text-xs ${
              coloredBirds.includes(index)
                ? 'bg-green-500 text-white'
                : index === currentBird
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            <div className="text-lg">{bird.emoji}</div>
            <div>{bird.name}</div>
          </div>
        ))}
      </div>

      {coloredBirds.length === birds.length && (
        <div className="text-center p-6 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-2xl">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-bold text-white">Amazing Job!</h3>
          <p className="text-white text-lg">You colored all {birds.length} birds beautifully!</p>
        </div>
      )}
    </div>
  );
};

export default ActivitiesZone;
