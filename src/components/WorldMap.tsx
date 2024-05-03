import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { ScoresResponse, Scores } from "../types/scores";
import { mapScoreToColor } from "../utils/colorUtils";
import { Geo } from "../types";

const geoUrl =
	"https://gist.githubusercontent.com/WunderBart/6a3c589643c1978fd5a9/raw/d5c98dc5be842e3b8272c96f13129ea8fbb6220e/world_by_iso_min_topo.json";

const WorldMap: React.FC<{
	apiScores: ScoresResponse;
	onGeoClick: (geo: any) => void;
}> = ({ apiScores, onGeoClick }) => {
	const scores: Scores = apiScores.scores;

	const handleClick = (geo: Geo) => () => {
		onGeoClick(geo);
	};
	return (
		<div style={{ position: "relative" }}>
			<ComposableMap>
				<Geographies geography={geoUrl}>
					{({ geographies }) =>
						geographies.map((geo) => {
							const iso = geo.properties.iso;

							return (
								<Geography
									key={geo.rsmKey}
									geography={geo}
									fill={
										scores?.hasOwnProperty(iso)
											? mapScoreToColor(scores[iso])
											: "#D6D6DA"
									}
									stroke="#FFFFFF"
									onClick={handleClick(geo.properties)}
								/>
							);
						})
					}
				</Geographies>
			</ComposableMap>
		</div>
	);
};

export default WorldMap;
