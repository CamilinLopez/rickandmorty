
function Card({ name, gender, species, image, id, onClose }){
    return(
        <div className="principal">
            <img src={image} alt={name} />
            <p>{name}</p>
            <p>{gender}</p>
            <p>{species}</p>
            <p>{id}</p>
            <button onClick={onClose}>X</button>
        </div>
    )
}

export default Card;