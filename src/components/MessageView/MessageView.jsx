// display a single message

export default function MessageView({message}) {

  const senderStyle = "self-end max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl mx-3 p-4 rounded-lg bg-gray-500 text-white"
  const receiverStyle = "self-start max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl mx-3 p-4 rounded-lg bg-blue-500 text-white"

  return (
    <>
    <div className={receiverStyle}>
      {message.content}
    </div>
    <div className={senderStyle}>
      My message goes here...
    </div>
    </>
  )
}
