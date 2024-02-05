// display a single message

export default function Message() {

  const senderStyle = "self-end max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl mx-3 p-4 rounded-lg bg-gray-500 text-white"
  const receiverStyle = "self-start max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl mx-3 p-4 rounded-lg bg-blue-500 text-white"

  return (
    <>
    <div className={receiverStyle}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste odit facilis laborum, omnis perferendis rerum labore maiores est id? Necessitatibus provident sed maxime! Nulla enim libero molestias hic provident officiis voluptatem fuga consectetur, labore quis, exercitationem ipsum expedita nisi vitae saepe nam nobis reprehenderit, ipsa tempore modi totam odio tenetur.
    </div>
    <div className={senderStyle}>
      My message goes here...
    </div>
    </>
  )
}
