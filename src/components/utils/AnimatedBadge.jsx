import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

const StyledBadge = styled(Badge)(({ theme, badgecolor, ...props }) => {
  const { badgecolor: _, ...rest } = props;

  return {
    '& .MuiBadge-badge': {
      backgroundColor: badgecolor || '#44b700',
      color: badgecolor || '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'myAnimatedBadge-ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes myAnimatedBadge-ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
    ...rest,
  };
});

const AnimatedBadge = ({ badgecolor, ...props }) => {
  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
      badgecolor={badgecolor}
      {...props}
    ></StyledBadge>
  );
};

export default AnimatedBadge;
