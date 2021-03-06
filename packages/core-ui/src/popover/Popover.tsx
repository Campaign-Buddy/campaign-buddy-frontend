import React from 'react';
import { Popover2 as PopoverCore, Placement } from '@blueprintjs/popover2';
import styled, { createGlobalStyle } from 'styled-components';
import { defaultTheme } from '../theme';

const StyledPopoverCore = styled(PopoverCore)`
	max-width: 100%;
`;

const GlobalStyle = createGlobalStyle<{ noPadding?: boolean }>`
	.bp-overrides-popover .bp4-popover2-content {
		padding: ${({ noPadding }) => (noPadding ? '0' : '8px')};
		background-color: ${({ theme }) =>
			theme.legacyCoreUi.colors.background} !important;
	}

	.bp-overrides-popover {
		margin: 4px;

		&.no-margin {
			margin: 0 !important;
		}
	}
`;
GlobalStyle.defaultProps = {
	theme: defaultTheme,
};

export interface PopoverProps {
	content: JSX.Element | string;
	isOpen: boolean;
	onClose: () => void;
	placement?: Placement;
	autoFocus?: boolean;
	noMargin?: boolean;
	noPadding?: boolean;
	className?: string;
}

const popoverModifiers = {
	offset: {
		enabled: true,
		options: {
			offset: [0, 8],
		},
	},
};

export const Popover: React.FC<React.PropsWithChildren<PopoverProps>> = ({
	children,
	content,
	isOpen,
	onClose,
	placement,
	autoFocus,
	noMargin,
	className,
	noPadding,
}) => {
	return (
		<>
			<GlobalStyle noPadding={noPadding} />
			<StyledPopoverCore
				content={<div>{content}</div>}
				isOpen={isOpen}
				onClose={onClose}
				minimal
				modifiers={popoverModifiers as any}
				popoverClassName={`bp-overrides-popover${noMargin ? ' no-margin' : ''}`}
				placement={placement}
				openOnTargetFocus={false}
				enforceFocus={false}
				autoFocus={autoFocus}
				className={className}
			>
				{children}
			</StyledPopoverCore>
		</>
	);
};
