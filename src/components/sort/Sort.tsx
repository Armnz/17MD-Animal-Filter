import {useState} from "react";

export type SortProps = {
    onSort: (sortForwardDirection: boolean) => void,
}

export const Sort = ({onSort}: SortProps) => {
    const [sortForwardDirection, setSortForwardDirection] = useState(true);

    return (
        <div>
            <button
                onClick={() => {
                    setSortForwardDirection(!sortForwardDirection);
                    onSort(sortForwardDirection);
                }}
            >Sort
            </button>
        </div>
    );
};

