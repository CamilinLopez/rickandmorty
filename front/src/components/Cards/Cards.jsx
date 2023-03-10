import Card from "../Card/Card";

const Cards = ({ characters, onClose }) => {


    return (
        <div className="principal">
            {
                characters.map(({ name, gender, species, image, id }) => {
                    return (
                        <Card
                            key={id}
                            name={name}
                            gender={gender}
                            species={species}
                            image={image}
                            id={id}
                            onClose={() => onClose(id)}
                        />
                    )
                })
            }
        </div>
    )
}

export default Cards;