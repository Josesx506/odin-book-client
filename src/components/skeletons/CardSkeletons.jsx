import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { GiHistogram } from "react-icons/gi";
import { IoArrowBack } from "react-icons/io5";
import { MdAddPhotoAlternate } from "react-icons/md";
import { RiShare2Fill } from "react-icons/ri";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const cardStyle = {
  display: 'flex',
  gap: '0.4em',
  width: '100%',
  padding: '0.3em 0.5em',
}

const cardHeaderStyle = {
  display: 'flex',
  gap: '0.4em',
  width: '100%',
  alignItems: 'center',
}

const cardBodyStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3em',
  padding: '0.2em',
  justifyContent: 'space-between',
  width: '100%'
}

function FollowUserSkeleton() {
  return (
    <div style={{ ...cardStyle, alignItems: 'center' }}>
      <Skeleton style={{ flex: 1 }} circle width={'40px'} height={'40px'} />
      <div style={cardBodyStyle}>
        <h4><Skeleton width={'80px'} /></h4>
        <div><Skeleton width={'100%'} /></div>
      </div>
      <div style={{ marginLeft: 'auto' }}><Skeleton width={'50px'} height={'23px'} /></div>
    </div>
  )
}

function UserWithBioSkeleton() {
  return (
    <div style={{ ...cardStyle, alignItems: 'flex-start' }}>
      <Skeleton style={{ flex: 1 }} circle width={'40px'} height={'40px'} />
      <div style={cardBodyStyle}>
        <div style={cardHeaderStyle}>
          <div>
            <h4 style={{ flex: 1 }}><Skeleton width={'130px'} /></h4>
            <div style={{ flex: 1 }}><Skeleton width={'150px'} /></div>
          </div>
          <div style={{ marginLeft: 'auto' }}><Skeleton width={'50px'} height={'23px'} /></div>
        </div>
        <div style={{ flex: 1 }}><Skeleton width={'100%'} /></div>
      </div>
    </div>
  )
}

function PostThumbnailTextSkeleton() {
  return (
    <div style={{ ...cardStyle, alignItems: 'flex-start' }}>
      <Skeleton style={{ flex: 1 }} circle width={'40px'} height={'40px'} />
      <div style={cardBodyStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <h4><Skeleton width={'150px'} /></h4>
          <Skeleton width={'30px'} />
        </div>
        <div style={{ flex: 1 }}><Skeleton count={2} width={'100%'} /></div>
        <InteractionSkeleton />
      </div>
    </div>
  )
}

function PostThumbnailImageSkeleton() {
  return (
    <div style={{ ...cardStyle, alignItems: 'flex-start' }}>
      <Skeleton style={{ flex: 1 }} circle width={'40px'} height={'40px'} />
      <div style={cardBodyStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <h4><Skeleton width={'150px'} /></h4>
          <Skeleton width={'30px'} />
        </div>
        <div style={{ flex: 1 }}><Skeleton width={'100%'} height={'200px'} /></div>
        <InteractionSkeleton />
      </div>
    </div>
  )
}

function PostDetailsSkeleton() {
  return (
    <div style={{ ...cardStyle, alignItems: 'flex-start' }}>
      <Skeleton style={{ flex: 1 }} circle width={'40px'} height={'40px'} />
      <div style={cardBodyStyle}>
        <div style={{ ...cardBodyStyle, padding: '0' }}>
          <h4 style={{ flex: 1 }}><Skeleton width={'80px'} /></h4>
          <div style={{ flex: 1 }}><Skeleton width={'90px'} /></div>
        </div>
        <div style={{ flex: 1 }}><Skeleton count={2} width={'100%'} /></div>
        <div style={{ display: 'flex', gap: '1em', flex: 1 }}>
          <Skeleton width={'40px'} />
          <Skeleton width={'40px'} />
          <Skeleton width={'40px'} />
        </div>
      </div>
    </div>
  )
}

const intrItemStyle = {
  display: 'flex',
  alignItems: 'center',
}

function InteractionSkeleton() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.3em 0.5em' }}>
      <div style={intrItemStyle}> <FaRegComment />&nbsp;<Skeleton width={'15px'} /> </div>
      <div style={intrItemStyle}> <FaRegHeart />&nbsp;<Skeleton width={'15px'} /> </div>
      <div style={intrItemStyle}> <GiHistogram />&nbsp;<Skeleton width={'15px'} /> </div>
      <div style={intrItemStyle}> <RiShare2Fill /></div>
    </div>
  )
}

function CommentSkeleton() {
  return (
    <div style={{ ...cardStyle, alignItems: 'flex-start' }}>
      <Skeleton style={{ flex: 1 }} circle width={'40px'} height={'40px'} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3em', width: '100%' }}>
        <div style={{ display: 'flex', gap: '0.75em', }}>
          <div style={{ ...intrItemStyle }}> <FaRegHeart />&nbsp;<Skeleton width={'15px'} /> </div>
          <h4 style={{ flex: 1 }}><Skeleton width={'120px'} /></h4>
        </div>
        <div><Skeleton count={1} width={'100%'} /></div>
      </div>
    </div>
  )
}

function InputSkeleton() {
  return (
    <div style={{ ...cardStyle, alignItems: 'flex-start' }}>
      <Skeleton style={{ flex: 1 }} circle width={'40px'} height={'40px'} />
      <div style={{ width: '100%' }}>
        <div style={{ width: '100%', height: '60px' }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <MdAddPhotoAlternate color="rgb(36, 158, 240)" />
          <h4><Skeleton width={'60px'} /></h4>
        </div>
      </div>
    </div>
  )
}

function BackNavSkeleton() {
  return (
    <div style={{ display: 'flex', gap: '1em', alignItems: 'center', width: '100%', paddingLeft: '0.3em', paddingBottom: '0.3em', }}>
      <IoArrowBack style={{ width: '2em', height: '2em', aspectRatio: '1', padding: '0.3em', }} />
      <h2><Skeleton width={'60px'} /></h2>
    </div>
  )
}

const pictureStyle = {
  flex: 1,
  padding: '0.2rem',
  position: 'absolute',
  top: '-60px',
  left: '5%',
  transform: 'translateX(-5%)',
}

const innerRows = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75em',
  position: 'relative',
  padding: '0.75em'
}

function ProfileDetailsSkeleton() {
  return (
    <div>
      <BackNavSkeleton />
      <div style={{ display: 'grid'}}>
        <div style={{ width: '100%', height: '6em', backgroundColor: 'lightgray', }}></div>
        <div style={innerRows}>
          <Skeleton style={pictureStyle} circle width={'120px'} height={'120px'} />
          <div style={{ padding: '0 1em 1em' }}></div>
          <div>
            <h2><Skeleton width={'100px'} /></h2>
            <div style={{paddingTop:'0.3em'}}><Skeleton width={'80px'} /></div>
          </div>
          <div><Skeleton width={'160px'} /></div>
          <div style={{ display: 'flex', gap: '1em', }}>
            <div><Skeleton width={'100px'} /></div>
            <div><Skeleton width={'100px'} /></div>
          </div>
          <div style={{ display: 'flex', gap: '1em', }}>
            <div><Skeleton width={'80px'} /></div>
            <div><Skeleton width={'80px'} /></div>
          </div>
        </div>
      </div>
    </div>
  )
}


export {
  BackNavSkeleton, CommentSkeleton, FollowUserSkeleton,
  InputSkeleton, InteractionSkeleton, PostDetailsSkeleton,
  PostThumbnailImageSkeleton, PostThumbnailTextSkeleton,
  ProfileDetailsSkeleton, UserWithBioSkeleton
};

