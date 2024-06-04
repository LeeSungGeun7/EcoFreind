import React, { useState } from "react";

const Card = ({ item, onClick }) => (
  <div onClick={() => onClick(item)}>
    <h2>{item.title}</h2>
    <p>{item.content}</p>
  </div>
);

const Modal = ({ item, onClose }) => (
  <div>
    <h2>{item.title}</h2>
    <p>{item.content}</p>
    <button onClick={onClose}>Close</button>
  </div>
);

const Slider = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      {items.map((item) => (
        <Card key={item.id} item={item} onClick={handleCardClick} />
      ))}
      {selectedItem && <Modal item={selectedItem} onClose={handleModalClose} />}
    </div>
  );
};
