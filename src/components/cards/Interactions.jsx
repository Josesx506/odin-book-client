import CommentButton from '@/components/buttons/CommentButton';
import LikeButton from '@/components/buttons/LikeButton';
import ViewsButton from '@/components/buttons/ViewsButton';
import { RiShare2Fill } from "react-icons/ri";
import toast from 'react-hot-toast';

export function PostThumbnailInteraction({ postId, likes, comments, views }) {
  const cmpStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'darkgray'
  }

  async function copyToClipboard(e) {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/feed/${postId}`;
    try {
      await window.navigator.clipboard.writeText(url);
      toast.success("Copied to clipboard")
    } catch(err) {
      toast.error(err.message || 'Copy failed')
    }
  }

  return (
    <div style={cmpStyle}>
      <CommentButton postId={postId} comments={comments}/>
      <LikeButton postId={postId} value={likes} />
      <ViewsButton views={views} />
      <RiShare2Fill onClick={copyToClipboard} cursor={'pointer'} />
    </div>
  )
}
