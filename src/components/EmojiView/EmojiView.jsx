import { useState, useEffect } from "react"
import { SmilePlus } from 'lucide-react'

export default function EmojiView({ onEmojiSelect }) {
    const [isVisible, setIsVisible] = useState(false)
    const [emojis, setEmojis] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')

    const categories = {
        "smileys-emotion": "😊",
        "animals-nature": "🐾",
        "food-drink": "🍔",
        "travel-places": "🌍",
        "activities": "⚽",
    }

    useEffect(() => {
    const fetchEmojis = async () => {
        let url = searchTerm ? 
                  `https://emoji-api.com/emojis?search=${searchTerm}&access_key=${process.env.REACT_APP_EMOJI_API}` :
                  `https://emoji-api.com/categories/${selectedCategory}?access_key=${process.env.REACT_APP_EMOJI_API}`

        if (!searchTerm && !selectedCategory) {
            return
        }

        const response = await fetch(url)
        const data = await response.json()

        setEmojis(data.slice(0, 20))
    };

    fetchEmojis()
}, [searchTerm, selectedCategory])


    const toggleEmojiPicker = () => setIsVisible(!isVisible)

    const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    console.log("Selected category:", category)
};
    return (
        <div className="relative">
            <button onClick={toggleEmojiPicker} className="p-2 text-gray-600 bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <SmilePlus className="w-6 h-6" />
            </button>
            {isVisible && (
                <div className="absolute top-full mt-2 bg-white shadow-md rounded-lg p-4 w-64 z-10 border border-gray-200">
                    <div className="flex justify-around mb-4">
                        {Object.entries(categories).map(([key, emoji]) => (
                            <button
                                key={key}
                                onClick={() => handleCategoryClick(key)}
                                className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-5 gap-2 mb-4">
                        {emojis.slice(0, 10).map((emoji) => (
                            <button
                                key={emoji.slug}
                                onClick={() => onEmojiSelect(emoji.character)}
                                className="text-xl hover:bg-gray-100 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {emoji.character}
                            </button>
                        ))}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
