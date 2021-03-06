import { Icon as IconCore, IconName } from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';
import { defaultTheme } from '../theme';

const StyledIconCore = styled(IconCore)`
	color: ${({ theme }) => theme.legacyCoreUi.colors.text};
`;
StyledIconCore.defaultProps = {
	theme: defaultTheme,
};

export interface IconProps {
	size?: number;
	icon: IconName;
}

export const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
	size,
	icon,
}) => <StyledIconCore iconSize={size ?? 16} icon={icon} />;

export { IconName };
