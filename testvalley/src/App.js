import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { FaApple, FaStar, FaTruck } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";

import {
	MdMenu,
	MdSearch,
	MdGamepad,
	MdPhone,
	MdWatch,
	MdTablet,
	MdHeadphones,
	MdCamera,
	MdTv,
	MdComputer,
	MdWash,
	MdKeyboard,
	MdArrowBackIos,
	MdArrowForwardIos,
} from "react-icons/md";

const ImageSlider = () => {
	const [shortcuts, setShortcuts] = useState([]);
	const [collection, setCollection] = useState([]);
	const [images, setImages] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const containerRef = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [shortcutsResponse, imagesResponse, collectionResponse] =
					await Promise.all([
						axios.get("https://api.testvalley.kr/main-shortcut/all"),
						axios.get("https://api.testvalley.kr/main-banner/all"),
						axios.get(
							"https://api.testvalley.kr/collections?prearrangedDiscount"
						),
					]);

				const filteredItems = collectionResponse.data.items.filter(
					(item) => item.type === "SINGLE" && item.viewType === "TILE"
				);
				console.log("Filtered Items:", filteredItems);

				setShortcuts(shortcutsResponse.data);
				setImages(imagesResponse.data);
				setCollection(filteredItems);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex === images.length - 1 ? 0 : prevIndex + 1
			);
		}, 5000);
		return () => clearInterval(intervalId);
	}, [images]);

	const [showDropdown, setShowDropdown] = useState(false);
	const [showSearchResult, setShowSearchResult] = useState(false);

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};
	const toggleSearchdown = () => {
		setShowSearchResult(!showSearchResult);
	};

	const categories = [
		{ title: "Apple", icon: <FaApple /> },
		{ title: "game devide", icon: <MdGamepad /> },
		{ title: "smartphone", icon: <MdPhone /> },
		{ title: "smart-watch", icon: <MdWatch /> },
		{ title: "table", icon: <MdTablet /> },
		{ title: "audio equipment", icon: <MdHeadphones /> },
		{ title: "camera", icon: <MdCamera /> },
		{ title: "computer", icon: <MdComputer /> },
		{ title: "Appliances", icon: <MdWash /> },
		{ title: "keyboard", icon: <MdKeyboard /> },
	];
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: false,
		centerPadding: "0%",
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					
				},
			},
		],
	};

	const scrollLeft = (sliderId) => {
		const slider = document.getElementById(sliderId);
		const scrollAmount = slider.scrollLeft - window.innerWidth;
		slider.scrollTo({
			left: scrollAmount,
			behavior: "smooth",
		});
	};

	const scrollRight = (sliderId) => {
		const slider = document.getElementById(sliderId);
		const scrollAmount = slider.scrollLeft + window.innerWidth;
		slider.scrollTo({
			left: scrollAmount,
			behavior: "smooth",
		});
	};

	return (
		<div className='slider-container'>
			<div className='appBar'>
				<div className='logoContainer'>
					<div className='logo'>Testvalley</div>
					<div className='categoryIcon' onClick={toggleDropdown}>
						<MdMenu
							style={{ marginRight: "5px", color: "rgb(89, 236, 187)" }}
						/>
						category
					</div>
					{showDropdown && (
						<div className='dropdownContainer'>
							{categories.map((category, index) => (
								<div className='dropdownItem' key={index}>
									<span style={{ fontSize: "30px" }}> {category.icon} </span>
									<p> {category.title} </p>
								</div>
							))}
						</div>
					)}
				</div>
				<div className='menuContainer'>
					<div className='searchContainer'>
						<MdSearch style={{ color: "rgb(41, 41, 41)", fontSize:'20px' }} />
						<input
							onClick={toggleSearchdown}
							type='text'
							className='searchInput'
							placeholder=" if you're wondering whether to buy it or not,"
						/>
					</div>
					{showSearchResult && (
						<div className='searchResult'>
							<p> recent sesarches </p>
						</div>
					)}
				</div>
				<div className='loginSignup'>Login / Signup</div>
			</div>
			<div className='image-slider-container'>
				<Slider {...settings}>
					{images.map((image, index) => (
						<div key={index} className='slide'>
							<img src={image.pcImageUrl} alt={image.title} />
						</div>
					))}
				</Slider>
			</div>
			<div className='shortcuts-container'>
				{shortcuts.map((shortcut) => (
					<div className='shortcut' key={shortcut.mainShortcutId}>
						<img src={shortcut.imageUrl} alt={shortcut.title} />
						<span>{shortcut.title}</span>
					</div>
				))}
			</div>
			<section className='body'>
				<div className='collection-container'>
					{collection.map((item) => (
						<div key={item.id} className='collection-item'>
							<div className='left'>
								<h2>{item.title}</h2>
								<p>{item.subtitle}</p>
							</div>
							<div className='right'>
								<div className='item-container' ref={containerRef} id='slider'>
									<div className='scroll-icons left-content'>
										<MdArrowBackIos
											className='scroll-trip scroll-icon-left'
											style={{
												fontSize: "13px",
												color: "rgb(194, 194, 194)",
												marginRight: "1px",
											}}
											onClick={() => scrollLeft("slider")}
										/>
										<MdArrowForwardIos
											className='scroll-trip scroll-icon-right'
											style={{
												fontSize: "13px",
												color: "rgb(194, 194, 194)",
												marginLeft: "10px",
											}}
											onClick={() => scrollRight("slider")}
										/>
									</div>
									{item.items.map((value) => (
										<div className='item-wrapper' key={value.publication.id}>
											<div className='each'>
												<div
													className='img-container'
													style={{ position: "relative" }}
												>
													{value.publication.media.map((one, index) => (
														<div
															key={index}
															style={{
																position: "relative",
																display: "inline-block",
															}}
														>
															<img
																src={one.uri}
																alt={one.title}
																style={{ width: "100%" }}
															/>
															{value.publication.isTrial && (
																<p
																	style={{
																		width: "49%",
																		position: "absolute",
																		bottom: "5px",
																		left: "5px",
																		backgroundColor: "rgb(20, 139, 134)",
																		color: "white",
																		display: "flex",
																		fontSize: "14px",
																		padding: "3px 6px",
																		borderRadius: "2px",
																		zIndex: 1,
																	}}
																>
																	<GiReturnArrow
																		style={{
																			paddingRight: "5px",
																			fontSize: "17px",
																		}}
																	/>
																	returnable
																</p>
															)}
														</div>
													))}
												</div>

												<p>{value.publication.title}</p>
												<div className="discount">
													{value.publication.priceInfo.discountRate !==
														undefined &&
													value.publication.priceInfo.discountRate !== 0 ? (
														<h3
															style={{
																fontSize: "20px",
																fontWeight: "100",
																margin: "2px 0",
															}}
														>
															{value.publication.priceInfo.discountRate}%{" "}
															{value.publication.priceInfo.price} 원
														</h3>
													) : (
														<p>{value.publication.priceInfo.price} 원</p>
													)}
												</div>
												<span>
													{value.publication.applyCoupon && (
														<p
															style={{
																backgroundColor: "rgb(245, 245, 245)",
																width: "25%",
																fontSize: "12px",
																padding: "2px 5px",
																borderRadius: "5px",
															}}
														>
															coupon
														</p>
													)}
												</span>
												<span
													style={{
														display: "flex",
														alignItems: "center",
														marginTop: "7px",
														fontSize: "17px",
													}}
												>
													<FaStar
														style={{
															marginRight: "5px",
															fontSize: "10px",
															color: "grey",
														}}
													/>
													{value.publication.rating}
												</span>
												<p>
													{value.publication.preface !== undefined &&
													value.publication.preface !== null &&
													value.publication.preface.trim() !== "" ? (
														<div
															style={{
																display: "flex",
																alignItems: "center",
																fontSize: "12px",
																border: "1px rgb(221, 221, 221) solid",
																paddingLeft: "10px",
															}}
														>
															<FaTruck
																style={{
																	marginRight: "5px",
																	color: "rgb(40, 207, 151)",
																}}
															/>
															{value.publication.preface}
														</div>
													) : (
														""
													)}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default ImageSlider;


{/* <div className='image-slider-container' >
					{images.map((image, index) => (
						<div key={index} className='slide'>
							<img src={image.pcImageUrl} alt={image.title} />
						</div>
					))}
			</div>

in the above code i need the 
- mapped images to be aligned horizontally and make the scroll able both using the mouse and using two icons at the end sides of the container left and right 
- the width of the images should be 70em and height of 40em
- display 1 image at the screen at a time and some parts of the rest of the images should also be visible 
- use infinite loop with slides per group */}