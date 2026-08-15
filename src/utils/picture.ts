import { ElMessage, type UploadProps } from "element-plus"
import 'element-plus/dist/index.css'
// 处理品牌logo上传函数，上传之前的钩子
export const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 不是jpg->1,是不是png
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('Avatar picture must be JPG/PNG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}