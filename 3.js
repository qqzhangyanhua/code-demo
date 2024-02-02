const  formatPath = (importStatement)=>{
let regex = /from\s+["']([^"']+)["']/g;

return importStatement.replace(regex, (match, p1) => {
        // 根据包名动态生成替换路径
        let packagePath = `/@${p1}`;
    
        return match.replace(p1, packagePath);
      });
}
formatPath('import { myUtil } from "utils";')