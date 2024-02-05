// import useEditStore from "src/store/editStore";
import { useState } from "react";
import style from "./index.module.less";
import TextSide from "./TextSide";
const LeftContent = () => {
  const list = [
    { name: "文本", icon: "icon-jingyingjihua" },
    { name: "图片", icon: "icon-jingyingjihua" },
    { name: "图形", icon: "icon-jingyingjihua" },
  ];
//   const { addCmp } = useEditStore(state=>state,()=>{return true});
//   onClick={() => addCmp({...item,type:1}as any)}
const [showSide,setShowSide] = useState(false)
  return (
    <>
      <div className={style.leftContent}>
        <ul>
          {list.map((item, index) => {
            return <li key={index} className={style.listItem} onClick={() => setShowSide(true)} >
                <i className={`icon ${item.icon}`}></i>
                <br />
                <span>{item.name}</span>
            </li>;
          })}
        </ul>
        {showSide && <div className={style.childContent}>
            <TextSide/>
            </div>}
      </div>
    </>
  );
};
export default LeftContent;
