/*
	A simple "back to top"-button.
*/

import React, { useState } from 'react';
import { useScrollPosition } from '../functions/scrollPosition';

export const BackToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false);

	useScrollPosition(({ currPos }) => {
		if (currPos.y < -500) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	});

	return(
		<div className={isVisible ? "speedy-fade-in" : "speedy-fade-out"}>
			<button type="button" className="btn btn-cta btn-square">
				<a href="#header">
					<span class="material-icons">
					keyboard_arrow_up
					</span>
				</a>
			</button>
		</div>
	);
}

export default BackToTopButton;