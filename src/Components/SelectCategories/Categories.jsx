import React, { useState } from "react";
import Styles from "./Category.module.css";
import { categoriesData } from "./CategoryData";
import { Stories } from "../../Store/Context";
const Categories = ({ onSelectedValue }) => {
  console.log(Stories());
  const [selectedId, setSelectedId] = useState(0);
  const handleSelectTeck = (data, id) => {
    // onSelectedValue(data.name);
    setSelectedId(id);
  };
  const getSelectedClass = (id) =>
    selectedId === id ? `${Styles.selected}` : "";
  return (
    <div className={Styles.container}>
      <div className={Styles.cards}>
        {categoriesData.map((category, i) => (
          <div
            key={i}
            onClick={() => {
              handleSelectTeck(category, i);
            }}
            className={`${Styles.category_card}  ${getSelectedClass(i)} `}
          >
            <h5>{category.name}</h5>
            <img src={category.img} alt={category.img} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;