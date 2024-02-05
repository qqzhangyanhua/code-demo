import { Card, Divider, Table,Button } from "antd";
import { Link } from "react-router-dom";
const ListPage = () => {
    interface ListItem {
        id:number;
        type:string;
        title:string;
        content:string;
    }
  const dataSource:ListItem[] = [
    {
      id: 1,
      type: "胡彦斌",
      title: '32',
      content: "西湖区湖底公园1号", 
    },
  
  ];
  const editUrl =(item:ListItem)=>`/?id=${item.id}&type=${item.type}`;
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
    {
        title: "操作",
        key: "action",
        render: (_:string,item:ListItem) => (
          <span>
            <Button type="link" onClick={()=>editUrl(item)}>编辑</Button>
            <Divider type="vertical" />
            <Link to="/">删除</Link>
          </span>
        ),
    }
  ];
  return (
    <Card>
      <Link to="/">新增</Link>
      <Divider type="vertical" />
      <Table dataSource={dataSource} columns={columns} rowKey={'id'} />
    </Card>
  );
};
export default ListPage;
