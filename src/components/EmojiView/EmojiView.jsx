import { useState, useEffect } from "react"
import { SmilePlus } from 'lucide-react'
import './EmojiView.css'

export default function EmojiView({ onEmojiSelect }) {
    const [isVisible, setIsVisible] = useState(false)
    const [emojis, setEmojis] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')

    // Category emojis
    const categories = {
        "smileys-emotion": "😊",
        "animals-nature": "🐾",
        "food-drink": "🍔",
        "travel-places": "🌍",
        "activities": "⚽",
    }

    useEffect(() => {
        const fetchEmojis = async () => {
            let url = `https://emoji-api.com/emojis?access_key=${process.env.REACT_APP_EMOJI_API}`
            if (searchTerm) {
                url += `&search=${searchTerm}`
            } else if (selectedCategory) {
                url += `&category=${selectedCategory}`
            }
            const response = await fetch(url)
            const data = await response.json()
            setEmojis(data.slice(0, 20))
        };

        fetchEmojis()
    }, [searchTerm, selectedCategory])

    const toggleEmojiPicker = () => setIsVisible(!isVisible)

    return (
        <div className="emoji-picker-container">
            <button onClick={toggleEmojiPicker}><SmilePlus /></button>
            {isVisible && (
                <div className="emoji-picker">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="categories">
                        {Object.entries(categories).map(([key, emoji]) => (
                            <button key={key} onClick={() => setSelectedCategory(key)} className="category-btn">
                                {emoji}
                            </button>
                        ))}
                    </div>
                    {emojis.slice(0, 10).map((emoji) => (
                        <button
                            key={emoji.slug}
                            onClick={() => onEmojiSelect(emoji.character)}
                            className="emoji-btn"
                        >
                            {emoji.character}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
