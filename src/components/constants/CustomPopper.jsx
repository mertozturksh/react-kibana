import React, { forwardRef } from 'react';
import { Popper } from '@mui/material';
import { styled, css } from '@mui/system';

const CustomPopper = forwardRef((props, ref) => {
  const { id, open, anchorEl, placement, children } = props;

  return (
    <Popper ref={ref} id={id} open={open} anchorEl={anchorEl} placement={placement}>
      <StyledPopperDiv>
        {children}
      </StyledPopperDiv>
    </Popper>
  );
});

export default CustomPopper;

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};
const StyledPopperDiv = styled('div')(
  ({ theme }) => css`
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: ${theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`};
    padding: 0.75rem;
    color: ${theme.palette.mode === 'dark' ? grey[100] : grey[700]};
    font-size: 0.875rem;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    opacity: 1;
    margin: 0.25rem 0;
    z-index: 999;
  `,
);