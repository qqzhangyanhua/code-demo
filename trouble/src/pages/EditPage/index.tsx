import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import CenterContent from "./CenterContent";
import {Layout} from "antd";
import styles from "./index.module.less";
const EditPage = () => {
  return (
    <Layout>
      <div className={styles.content}>
        <LeftContent />
        <CenterContent/>
        <RightContent />
      </div>
    </Layout>
  );
};
export default EditPage;
