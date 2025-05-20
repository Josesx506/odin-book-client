import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const mainStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1em',
  width: 'min(85vw, 400px)',
  margin: '4em auto 0',
  border: '1px solid lightgray',
  borderRadius: '0.5em',
  padding: '3em 1em 1em',
  position: 'relative',
}

const pictureStyle = {
  flex: 1,
  padding: '0.2rem',
  position: 'absolute',
  top: '-60px',
  left: '50%',
  transform: 'translateX(-50%)',
}

export default function EditProfileSkltn() {
  return (
    <div style={mainStyle} >
      <Skeleton style={pictureStyle} circle width={'120px'} height={'120px'} />
      <div style={{display: 'flex', flexDirection:'column', gap: '1.5em', }}>
      <h1 style={{ flex: 1 }}> <Skeleton /> </h1>
      <h1 style={{ flex: 1 }}> <Skeleton /> </h1>
      <h1 style={{ flex: 1 }}> <Skeleton /> </h1>
      <div style={{ flex: 1 }}> <Skeleton height={'4rem'} /> </div>
      <div style={{display: 'flex', justifyContent:'center'}}>
        <Skeleton style={{ flex: 1 }}  width={'120px'} height={'1.8rem'} />
      </div>
      </div>
    </div>
  )
}