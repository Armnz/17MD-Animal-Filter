import styles from './AnimalCard.module.css'

export type AnimalCardProps = {
    id: number,
    name: string,
    pictureUrl: string,
    onDelete: (id: number) => void,
    onEdit: (id: number) => void,
}

export const AnimalCard = ({id, name, pictureUrl, onDelete, onEdit}: AnimalCardProps) => {
    return (
        <div className={styles.container}>
            <h1> {name} </h1>
            <img
                className={styles.animalImage}
                src={pictureUrl}
                alt="Animal image"/>

            <div className={styles.buttonContainer}>
                <button
                    className={styles.button}
                    onClick={() => onDelete(id)}
                >Delete
                </button>
                <button
                    className={styles.button}
                    onClick={() => onEdit(id)}
                >Edit
                </button>
            </div>
        </div>
    );
};

