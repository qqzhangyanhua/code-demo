import useEditStore from "src/store/editStore";
import styles from "./index.module.less";
const Canvas = () => {
  const { canvas } = useEditStore();
  console.log(canvas);
const {cmps} = canvas;
  return (
    <div
      id="canvas"
      className={styles.main}
      style={canvas.style}
    >
      {cmps.map((item, index) => {
        return (
          <div key={index} style={item.style}>
            {item.value}
          </div>
        );
      })}
    </div>
  );
};
export default Canvas;
