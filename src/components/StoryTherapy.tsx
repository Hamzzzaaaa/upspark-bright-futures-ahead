
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Star, ArrowRight, Gift } from 'lucide-react';

interface StoryChapter {
  id: number;
  title: string;
  content: string;
  activitiesRequired: number;
  activitiesCompleted: number;
  reward: string;
  unlocked: boolean;
}

interface StoryTherapyProps {
  childName: string;
  activitiesCompleted: number;
}

const StoryTherapy = ({ childName, activitiesCompleted }: StoryTherapyProps) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [story, setStory] = useState<StoryChapter[]>([
    {
      id: 1,
      title: "The Magic Garden Adventure",
      content: `Once upon a time, ${childName} discovered a secret garden behind their house. The garden was filled with talking flowers and friendly butterflies who needed help organizing their colorful world.`,
      activitiesRequired: 5,
      activitiesCompleted: 0,
      reward: "Magic Watering Can",
      unlocked: true
    },
    {
      id: 2,
      title: "The Puzzle Castle",
      content: `${childName} and their new butterfly friends found a mysterious castle made entirely of puzzles. To enter, they needed to solve the riddles of the wise owl guardian.`,
      activitiesRequired: 10,
      activitiesCompleted: 0,
      reward: "Golden Key",
      unlocked: false
    },
    {
      id: 3,
      title: "The Rainbow Bridge",
      content: `Inside the castle, ${childName} discovered a bridge made of rainbows. But some colors were missing! Only by completing special color activities could the bridge be restored.`,
      activitiesRequired: 15,
      activitiesCompleted: 0,
      reward: "Rainbow Wand",
      unlocked: false
    },
    {
      id: 4,
      title: "The Treasure of Friendship",
      content: `At the end of the rainbow bridge, ${childName} found the greatest treasure of all - a chest full of golden stars that represented all the new skills they had learned!`,
      activitiesRequired: 20,
      activitiesCompleted: 0,
      reward: "Champion Medal",
      unlocked: false
    }
  ]);

  useEffect(() => {
    // Update story progress based on activities completed
    const updatedStory = story.map((chapter, index) => {
      const newChapter = { ...chapter };
      
      // Update activities completed for current and previous chapters
      if (index <= currentChapter) {
        newChapter.activitiesCompleted = Math.min(activitiesCompleted, chapter.activitiesRequired);
      }
      
      // Unlock next chapter if current is completed
      if (index === currentChapter + 1 && story[currentChapter]?.activitiesCompleted >= story[currentChapter]?.activitiesRequired) {
        newChapter.unlocked = true;
      }
      
      return newChapter;
    });

    setStory(updatedStory);

    // Move to next chapter if current is completed
    if (story[currentChapter]?.activitiesCompleted >= story[currentChapter]?.activitiesRequired && currentChapter < story.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  }, [activitiesCompleted, currentChapter]);

  const currentStory = story[currentChapter];
  const progressPercentage = currentStory ? (currentStory.activitiesCompleted / currentStory.activitiesRequired) * 100 : 0;

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-100 to-pink-100">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-800">
            <Book className="w-6 h-6 mr-2" />
            {childName}'s Adventure Story
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentStory && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">{currentStory.title}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-600">Chapter {currentChapter + 1}</span>
                </div>
              </div>

              <div className="bg-white bg-opacity-70 p-4 rounded-lg">
                <p className="text-gray-700 leading-relaxed">{currentStory.content}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Progress: {currentStory.activitiesCompleted}/{currentStory.activitiesRequired} activities
                  </span>
                  <span className="text-sm text-gray-600">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {currentStory.activitiesCompleted >= currentStory.activitiesRequired ? (
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-3 rounded-lg flex items-center space-x-3">
                  <Gift className="w-6 h-6 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-800">Chapter Complete!</p>
                    <p className="text-sm text-orange-700">You earned: {currentStory.reward}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Complete {currentStory.activitiesRequired - currentStory.activitiesCompleted} more activities to continue the story!
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Story chapters overview */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-800">Story Chapters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {story.map((chapter, index) => (
              <div key={chapter.id} className={`flex items-center space-x-3 p-3 rounded-lg ${
                index === currentChapter ? 'bg-purple-100 border-2 border-purple-300' : 
                chapter.unlocked ? 'bg-green-50' : 'bg-gray-50'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  chapter.activitiesCompleted >= chapter.activitiesRequired ? 'bg-green-500 text-white' :
                  chapter.unlocked ? 'bg-purple-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {chapter.activitiesCompleted >= chapter.activitiesRequired ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${chapter.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                    {chapter.title}
                  </p>
                  <p className="text-xs text-gray-600">
                    {chapter.activitiesCompleted}/{chapter.activitiesRequired} activities
                  </p>
                </div>
                {index === currentChapter && (
                  <ArrowRight className="w-5 h-5 text-purple-600" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryTherapy;
