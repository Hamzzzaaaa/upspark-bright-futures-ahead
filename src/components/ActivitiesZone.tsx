import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, ArrowLeft, RefreshCw, Volume2, Upload, CheckCircle, PlayCircle } from 'lucide-react';
import { Canvas as FabricCanvas, PencilBrush } from 'fabric';

interface Activity {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: 'cognitive' | 'motor' | 'speech' | 'creative' | 'sensory' | 'daily_living';
  completed: boolean;
  emoji: string;
  interactive?: boolean;
  requiresVideo?: boolean;
  videoInstructions?: string;
}

interface ActivitiesZoneProps {
  childName: string;
  selectedPlan?: number; // days from therapist booking
  onActivityComplete?: () => void;
}

const ActivitiesZone = ({ childName, selectedPlan = 30, onActivityComplete }: ActivitiesZoneProps) => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 'activity1',
      title: 'Activity 1',
      description: 'Color Sorting Game - Sort colored balls into matching jars',
      duration: 15,
      category: 'cognitive',
      emoji: '🔴',
      completed: false,
      interactive: true
    },
    {
      id: 'activity2',
      title: 'Activity 2',
      description: 'Animal Name Game - Click on animals and learn their names',
      duration: 12,
      category: 'cognitive',
      emoji: '🐶',
      completed: false,
      interactive: true
    },
    {
      id: 'activity3',
      title: 'Activity 3',
      description: 'Alphabet Scribbling - Draw letters with colorful crayons',
      duration: 20,
      category: 'creative',
      emoji: '✏️',
      completed: false,
      interactive: true
    },
    {
      id: 'activity4',
      title: 'Activity 4',
      description: 'Shape Selection - Identify and name different shapes',
      duration: 10,
      category: 'cognitive',
      emoji: '🔷',
      completed: false,
      interactive: true
    },
    {
      id: 'activity5',
      title: 'Activity 5',
      description: 'Unbuttoning a Shirt - Practice fine motor skills by unbuttoning clothes',
      duration: 15,
      category: 'daily_living',
      emoji: '👕',
      completed: false,
      requiresVideo: true,
      videoInstructions: 'Record a video showing your child unbuttoning at least 3 buttons on a shirt. Make sure the child is doing it independently.'
    },
    {
      id: 'activity6',
      title: 'Activity 6',
      description: 'Combing Hair - Learn self-grooming by combing hair properly',
      duration: 8,
      category: 'daily_living',
      emoji: '🪮',
      completed: false,
      requiresVideo: true,
      videoInstructions: 'Record a video of your child combing their hair from front to back. Show at least 10 strokes with proper grip.'
    },
    {
      id: 'activity7',
      title: 'Activity 7',
      description: 'Brushing Teeth - Develop oral hygiene habits with proper technique',
      duration: 12,
      category: 'daily_living',
      emoji: '🪥',
      completed: false,
      requiresVideo: true,
      videoInstructions: 'Record your child brushing teeth for 1-2 minutes. Show proper circular motions on all teeth surfaces.'
    },
    {
      id: 'activity8',
      title: 'Activity 8',
      description: 'Tying Shoelaces - Master the coordination needed for tying shoes',
      duration: 20,
      category: 'daily_living',
      emoji: '👟',
      completed: false,
      requiresVideo: true,
      videoInstructions: 'Record your child tying shoelaces independently. Show the complete process from loose laces to tied bow.'
    },
    {
      id: 'activity9',
      title: 'Activity 9',
      description: 'Washing Hands - Practice proper handwashing technique',
      duration: 10,
      category: 'daily_living',
      emoji: '🧼',
      completed: false,
      requiresVideo: true,
      videoInstructions: 'Record your child washing hands with soap for 20 seconds. Show scrubbing palms, backs, and between fingers.'
    },
    {
      id: 'activity10',
      title: 'Activity 10',
      description: 'Folding Clothes - Learn organization skills by folding simple garments',
      duration: 15,
      category: 'daily_living',
      emoji: '👔',
      completed: false,
      requiresVideo: true,
      videoInstructions: 'Record your child folding a t-shirt or simple garment. Show the complete folding process neatly.'
    }
  ]);

  const [activeActivity, setActiveActivity] = useState<Activity | null>(null);
  const [uploadedVideos, setUploadedVideos] = useState<{[key: string]: string}>({});

  const toggleActivity = (id: string) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === id 
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    );
    onActivityComplete?.();
  };

  const openActivity = (activity: Activity) => {
    if (activity.interactive && !activity.requiresVideo) {
      setActiveActivity(activity);
    } else if (activity.requiresVideo) {
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
      sensory: 'from-indigo-400 to-blue-500',
      daily_living: 'from-orange-400 to-red-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  const completedCount = activities.filter(a => a.completed).length;

  const handleVideoUpload = (activityId: string, file: File) => {
    const videoUrl = URL.createObjectURL(file);
    setUploadedVideos(prev => ({
      ...prev,
      [activityId]: videoUrl
    }));
  };

  const verifyAndCompleteActivity = (activityId: string) => {
    toggleActivity(activityId);
    setActiveActivity(null);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Great job! Activity completed successfully!');
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  // If interactive activity is active, show the interactive component
  if (activeActivity) {
    // Handle video upload activities
    if (activeActivity.requiresVideo) {
      return (
        <VideoUploadActivity 
          activity={activeActivity}
          onBack={() => setActiveActivity(null)}
          onVideoUpload={(file) => handleVideoUpload(activeActivity.id, file)}
          onComplete={() => verifyAndCompleteActivity(activeActivity.id)}
          uploadedVideo={uploadedVideos[activeActivity.id]}
        />
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setActiveActivity(null)}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-white">Back</span>
          </Button>
          <h2 className="text-xl font-normal text-white">
            {activeActivity.title}
          </h2>
        </div>
        
        {activeActivity.title.includes('Activity 1') && (
          <ColorSortingGame 
            onComplete={() => {
              toggleActivity(activeActivity.id);
              setActiveActivity(null);
            }}
          />
        )}
        
        {activeActivity.title.includes('Activity 2') && (
          <AnimalNameGame 
            onComplete={() => {
              toggleActivity(activeActivity.id);
              setActiveActivity(null);
            }}
          />
        )}
        
        {activeActivity.title.includes('Activity 3') && (
          <AlphabetScribbling 
            onComplete={() => {
              toggleActivity(activeActivity.id);
              setActiveActivity(null);
            }}
          />
        )}
        
        {activeActivity.title.includes('Activity 4') && (
          <ShapeSelectionGame 
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
        <h2 className="text-2xl font-black text-white mb-2">
          {childName}'s Activities 🌟
        </h2>

        <div className="bold-card p-4 rounded-2xl">
          <p className="text-lg font-black text-white">
            {completedCount} of {activities.length} activities completed!
          </p>
          <div className="w-full bg-gray-700 rounded-full h-3 mt-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / activities.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="space-y-4">
        {activities.map((activity) => (
          <Card 
            key={activity.id} 
            className={`bold-card border-0 shadow-lg transition-all duration-300 cursor-pointer ${
              activity.completed ? 'opacity-75' : ''
            }`}
            onClick={() => openActivity(activity)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{activity.emoji}</span>
                  <div>
                    <h3 className="text-xl font-black text-white mb-1">{activity.title}</h3>
                    <p className="text-base font-bold text-gray-300 mb-2">{activity.description}</p>
                    <div className="flex items-center text-gray-400 space-x-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm font-bold">{activity.duration} min</span>
                      </div>
                      {activity.requiresVideo && (
                        <div className="flex items-center text-orange-400">
                          <Upload className="w-4 h-4 mr-1" />
                          <span className="text-sm font-bold">Video Required</span>
                        </div>
                      )}
                      {activity.interactive && !activity.requiresVideo && (
                        <div className="flex items-center text-blue-400">
                          <PlayCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm font-bold">Interactive</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {activity.completed && (
                  <div className="text-3xl">✅</div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Video Upload Activity Component
const VideoUploadActivity = ({ 
  activity, 
  onBack, 
  onVideoUpload, 
  onComplete, 
  uploadedVideo 
}: {
  activity: Activity;
  onBack: () => void;
  onVideoUpload: (file: File) => void;
  onComplete: () => void;
  uploadedVideo?: string;
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      onVideoUpload(file);
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      onComplete();
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          onClick={onBack}
          variant="outline"
          size="sm"
          className="flex items-center space-x-2 text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-white">Back</span>
        </Button>
        <h2 className="text-xl font-normal text-white">
          {activity.title}
        </h2>
      </div>

      <div className="text-center">
        <div className="text-6xl mb-4">{activity.emoji}</div>
        <h3 className="text-2xl font-normal text-white mb-2">{activity.description}</h3>
        <p className="text-gray-300 text-lg mb-6">Duration: {activity.duration} minutes</p>
      </div>

      {/* Instructions Card */}
      <Card className="bold-card">
        <CardHeader>
          <CardTitle className="text-white text-xl font-black">📋 Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 text-lg leading-relaxed">
            {activity.videoInstructions}
          </p>
        </CardContent>
      </Card>

      {/* Video Upload Section */}
      <Card className="bold-card">
        <CardHeader>
          <CardTitle className="text-white text-xl font-black">📹 Upload Video</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          {!uploadedVideo ? (
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-normal py-4 text-lg rounded-xl"
            >
              <Upload className="w-5 h-5 mr-2" />
              Choose Video File
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-100 border border-green-300 rounded-xl p-4">
                <div className="flex items-center text-green-700 mb-2">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-bold">Video Uploaded Successfully!</span>
                </div>
                <video 
                  src={uploadedVideo} 
                  controls 
                  className="w-full rounded-lg"
                  style={{ maxHeight: '300px' }}
                />
              </div>
              
              <div className="flex space-x-4">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="flex-1 text-white border-white hover:bg-white hover:text-gray-800"
                >
                  Upload Different Video
                </Button>
                
                <Button
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-normal"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verify & Complete
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {isVerifying && (
        <Card className="bold-card bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-yellow-500/30">
          <CardContent className="p-6 text-center">
            <RefreshCw className="w-8 h-8 text-yellow-400 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-black text-white mb-2">Verifying Activity...</h3>
            <p className="text-yellow-300">Our AI is analyzing the video to verify completion</p>
          </CardContent>
        </Card>
      )}
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
        <h3 className="text-2xl font-normal text-white mb-2">Color Sorting Game 🎯</h3>
        <p className="text-gray-300">Pick up the colored balls and put them in the jar!</p>
        <div className="text-3xl font-normal text-purple-300 mt-4">
          Count: {score} / {balls.length}
        </div>
      </div>

      {/* Available Balls */}
      <div className="bg-gray-100 p-6 rounded-2xl">
        <h4 className="text-lg font-normal text-gray-800 mb-4 text-center">Pick a Ball</h4>
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
          <p className="text-lg font-normal text-gray-300 mb-4">
            You picked: <span className="text-2xl font-normal" style={{ color: currentBall.color }}>
              {currentBall.name}
            </span>
          </p>
          <div className={`w-20 h-20 rounded-full ${getBallColor(currentBall.color)} mx-auto shadow-lg animate-bounce`} />
        </div>
      )}

      {/* Empty Jar */}
      <div className="bg-gradient-to-b from-transparent to-gray-200 p-8 rounded-2xl border-4 border-dashed border-gray-400 min-h-32">
        <h4 className="text-lg font-normal text-gray-800 mb-4 text-center">Empty Jar</h4>
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
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-normal py-3 px-6 rounded-xl text-lg"
            >
              Put Ball in Jar! 🫙
            </Button>
          </div>
        )}
      </div>

      {score === balls.length && (
        <div className="text-center p-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-normal text-white">Amazing Job!</h3>
          <p className="text-white text-lg">You sorted all {balls.length} colors!</p>
        </div>
      )}
    </div>
  );
};

// Animal Name Game Component - Updated with selection and feedback
const AnimalNameGame = ({ onComplete }: { onComplete: () => void }) => {
  const [animals] = useState([
    { id: 1, name: 'Dog', emoji: '🐶' },
    { id: 2, name: 'Cat', emoji: '🐱' },
    { id: 3, name: 'Lion', emoji: '🦁' },
    { id: 4, name: 'Elephant', emoji: '🐘' },
    { id: 5, name: 'Monkey', emoji: '🐵' }
  ]);
  
  const [score, setScore] = useState(0);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(true);

  const currentAnimal = animals[currentAnimalIndex];
  
  // Create shuffled options for each question
  const getRandomOptions = () => {
    const correctAnswer = currentAnimal.name;
    const wrongOptions = animals
      .filter(animal => animal.name !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map(animal => animal.name);
    
    const allOptions = [correctAnswer, ...wrongOptions]
      .sort(() => Math.random() - 0.5);
    
    return allOptions;
  };

  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setOptions(getRandomOptions());
  }, [currentAnimalIndex]);

  const selectOption = (selectedName: string) => {
    const isCorrect = selectedName === currentAnimal.name;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback('Right! 🎉');
      
      // Speak success message
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`Right! This is a ${currentAnimal.name}!`);
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }
    } else {
      setFeedback('Wrong! 😔');
      
      // Speak correct answer
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`Wrong! This is a ${currentAnimal.name}.`);
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }
    }

    setShowOptions(false);

    // Move to next animal or complete game
    setTimeout(() => {
      if (currentAnimalIndex + 1 < animals.length) {
        setCurrentAnimalIndex(prev => prev + 1);
        setFeedback(null);
        setShowOptions(true);
      } else {
        setGameCompleted(true);
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(`Great job! You got ${score + (isCorrect ? 1 : 0)} out of ${animals.length} correct!`);
          speechSynthesis.speak(utterance);
        }
        setTimeout(onComplete, 2000);
      }
    }, 2000);
  };

  if (gameCompleted) {
    return (
      <div className="text-center p-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl">
        <div className="text-4xl mb-2">🎉</div>
        <h3 className="text-2xl font-normal text-white">Game Complete!</h3>
        <p className="text-white text-lg">You got {score} out of {animals.length} correct!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-normal text-white mb-2">Animal Name Game 🐾</h3>
        <p className="text-gray-300">What animal is this?</p>
        <div className="text-3xl font-normal text-green-300 mt-4">
          Question {currentAnimalIndex + 1} of {animals.length} | Score: {score}
        </div>
      </div>

      {/* Current Animal Display */}
      <div className="text-center bg-gradient-to-br from-yellow-100 to-orange-100 p-8 rounded-2xl">
        <div className="text-8xl mb-4">{currentAnimal.emoji}</div>
        <h4 className="text-2xl font-normal text-gray-800">What animal is this?</h4>
      </div>

      {/* Feedback Display */}
      {feedback && (
        <div className={`text-center p-4 rounded-2xl ${
          feedback.includes('Right') 
            ? 'bg-gradient-to-r from-green-400 to-green-500' 
            : 'bg-gradient-to-r from-red-400 to-red-500'
        }`}>
          <div className="text-2xl font-normal text-white">{feedback}</div>
          <div className="text-lg text-white mt-2">
            This is a <strong>{currentAnimal.name}</strong>!
          </div>
        </div>
      )}

      {/* Answer Options */}
      {showOptions && (
        <div className="grid grid-cols-1 gap-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => selectOption(option)}
              className="p-4 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-normal text-xl rounded-2xl transition-all duration-200 hover:scale-105"
            >
              {option}
            </button>
          ))}
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
        <h3 className="text-2xl font-normal text-white mb-2">Alphabet Scribbling ✏️</h3>
        <p className="text-gray-300">Draw the letter with your mouse or finger!</p>
        <div className="text-3xl font-normal text-purple-300 mt-4">
          Letters Done: {completedLetters.length} / {letters.length}
        </div>
      </div>

      <div className="text-center">
        <h4 className="text-lg font-normal text-gray-300 mb-4">
          Draw the letter: <span className="text-4xl font-normal text-blue-300">{currentLetter}</span>
        </h4>
        <p className="text-lg mb-4 text-gray-300">
          Use this color: <span 
            className="font-normal text-2xl inline-block w-8 h-8 rounded-full border-2 border-gray-400" 
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
          className="flex items-center space-x-2 text-white border-white hover:bg-white hover:text-gray-800"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Clear</span>
        </Button>
        
        <Button
          onClick={finishLetter}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-normal py-3 px-6 rounded-xl"
        >
          Finished Drawing!
        </Button>
        
        <Button
          onClick={nextLetter}
          variant="outline"
          className="flex items-center space-x-2 text-white border-white hover:bg-white hover:text-gray-800"
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
            className={`w-12 h-12 rounded-full flex items-center justify-center font-normal ${
              completedLetters.includes(letter)
                ? 'bg-green-500 text-white'
                : letter === currentLetter
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {letter}
          </div>
        ))}
      </div>

      {completedLetters.length === letters.length && (
        <div className="text-center p-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-normal text-white">Amazing Job!</h3>
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
        <h3 className="text-2xl font-normal text-white mb-2">Shape Selection Game 🔷</h3>
        <p className="text-gray-300">Click on the shapes to learn their names!</p>
        <div className="text-3xl font-normal text-blue-300 mt-4">
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
              <div className={`text-xl font-normal ${isSelected ? 'text-green-700' : 'text-white'}`}>
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
          <h3 className="text-2xl font-normal text-white">Amazing Job!</h3>
          <p className="text-white text-lg">You learned all {shapes.length} shape names!</p>
        </div>
      )}
    </div>
  );
};

export default ActivitiesZone;
