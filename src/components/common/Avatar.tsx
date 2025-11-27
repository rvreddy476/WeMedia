import { User } from '../../data/types';

type AvatarProps = {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
};

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

const Avatar = ({ user, size = 'md', showBadge = false }: AvatarProps) => {
  return (
    <div className="relative inline-flex items-center">
      <img
        src={user.avatarUrl}
        alt={user.name}
        className={`rounded-full object-cover shadow-soft ${sizeClasses[size]}`}
      />
      {showBadge && (
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"></span>
      )}
    </div>
  );
};

export default Avatar;
