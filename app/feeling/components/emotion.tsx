import React from 'react'

interface MyButtonProps {
  /** The text to display inside the button */
  title: string;
  /** Whether the button can be interacted with */
  disabled: boolean;
}
const Emotion = ({ title, disabled }: MyButtonProps) => {
  return <div>emotion {title}</div>;
};

export default Emotion