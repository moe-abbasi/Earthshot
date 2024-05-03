import { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown";
import DataTable from "../components/DataTable";
import NavBar from "../components/NavBar";
import WorldMap from "../components/WorldMap";
import NumberInput from "../components/NumberInput";
import { ScoresResponse } from "../types/scores";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { TableData, Geo, ScoresByCountryAPI } from "../types";
import "./Home.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/RootState";
import { products } from "../data/productsData";

function App() {
	const [scores, setScores] = useState<ScoresResponse>();
	const [country, setCountry] = useState<Geo>();
	const [product, setProduct] = useState<Record<string, string>>(products[0]);
	const [scoresByCountry, setScoresByCountry] =
		useState<ScoresByCountryAPI>();
	const [tableData, setTableData] = useState<TableData[]>();
	const username = useSelector((state: RootState) => state.auth.username);
	const [value, setValue] = useState<string>("");

	const selectCountry = async (countryname: Geo) => {
		setCountry(countryname);
		try {
			const response = await fetch(
				`https://coverage-mapper-2rca5acexa-uc.a.run.app/posts?product=${product.code}&country=${countryname.iso}`,
				{
					method: "GET",
					headers: {
						accept: "application/json",
						"x-api-key": "FdjP9BcDkTaoYJwlocTwpQ8nft31fSg7",
					},
				}
			);
			const data = await response.json();
			setScoresByCountry(data);
		} catch (error) {}
	};
	useEffect(() => {
		if (scoresByCountry) {
			const data: TableData[] = scoresByCountry?.posts?.map((country) => {
				return {
					id: country.id,
					user: country.user,
					rating: country.score,
				};
			});
			setTableData(data);
		}
	}, [country, scoresByCountry]);

	const loadCountryRatings = async (productName: string) => {
		const selectedProduct = products.find(
			(product) => product.name === productName
		);
		if (selectedProduct) setProduct(selectedProduct);
		else return;
		try {
			const response = await fetch(
				`https://coverage-mapper-2rca5acexa-uc.a.run.app/scores?product=${product.code}`,
				{
					method: "GET",
					headers: {
						accept: "application/json",
						"x-api-key": "FdjP9BcDkTaoYJwlocTwpQ8nft31fSg7",
					},
				}
			);
			const data = await response.json();
			setScores(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://coverage-mapper-2rca5acexa-uc.a.run.app/scores?product=001",
					{
						method: "GET",
						headers: {
							accept: "application/json",
							"x-api-key": "FdjP9BcDkTaoYJwlocTwpQ8nft31fSg7",
						},
					}
				);
				const data = await response.json();
				setScores(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const handleValueChange = (newValue: string) => {
		setValue(newValue);
	};

	const send = async () => {
		const payload = {
			country: country?.iso,
			product: product.code,
			score: value,
			comment: "",
			user: username,
		};
		try {
			const response = await fetch(
				`https://coverage-mapper-2rca5acexa-uc.a.run.app/posts`,
				{
					method: "POST",
					headers: {
						accept: "application/json",
						"x-api-key": "FdjP9BcDkTaoYJwlocTwpQ8nft31fSg7",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				}
			);

			const data = await response.json();
			setScoresByCountry(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	return (
		<div className="main">
			<NavBar></NavBar>
			<div className="mainContainer">
				<div className="infoSection">
					<div className="countryInfo">
						<h2 className="selectedCountryText">
							Selected Country:
						</h2>
						<b>{country?.name ? country?.name : "None"}</b>
						<br />
					</div>

					<Divider flexItem />
					{country?.name ? (
						<div className="submitRating">
							<p>
								Submit a rating for {product.name} from{" "}
								{country?.name}
							</p>
							<NumberInput
								label="Rate"
								onValueChange={handleValueChange}
							/>
							<Button onClick={send}> SUBMIT </Button>
						</div>
					) : (
						""
					)}

					<DataTable
						data={tableData}
						onRemove={() => console.log("removed")}
					></DataTable>
				</div>
				<Divider orientation="vertical" flexItem />{" "}
				<div className="displaySection">
					<Dropdown
						label="Select a product"
						options={products}
						defaultValue={products[0].name}
						onChange={loadCountryRatings}
					/>
					{scores && (
						<WorldMap
							apiScores={scores}
							onGeoClick={selectCountry}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
