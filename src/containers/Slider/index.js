import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Assurez-vous que data.focus est défini avant de trier
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (byDateDesc && byDateDesc.length) {
        setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
      }
    }, 5000);

    return () => {
      clearInterval(timer); // Nettoyer le timer lorsque le composant est démonté
    }
  }, [byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.id || idx} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={`radio-${event.id || radioIdx}`} // Utilisation d'une clé unique basée sur event.id ou radioIdx
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;




