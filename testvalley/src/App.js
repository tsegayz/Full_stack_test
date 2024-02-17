import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { FaApple, FaStar } from "react-icons/fa";
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
} from "react-icons/md";

const ImageSlider = () => {
	const [shortcuts, setShortcuts] = useState([]);
	const [collection, setCollection] = useState([]);
	const [images, setImages] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const containerRef = useRef(null);

	useEffect(() => {
		const scrollContainer = containerRef.current;

		const scrollInterval = setInterval(() => {
			scrollContainer.scrollLeft += 1;
		}, 20);
		setTimeout(() => {
			clearInterval(scrollInterval);
		}, 2000);

		return () => clearInterval(scrollInterval);
	}, []);

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

	const goToPrevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	const goToNextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		);
	};

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
		{ title: "TV", icon: <MdTv /> },
		{ title: "Appliances", icon: <MdWash /> },
		{ title: "keyboard", icon: <MdKeyboard /> },
	];
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: true,
		centerMode: true,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					centerMode: true,
					centerPadding: "40px",
				},
			},
		],
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
									<span style={{ fontSize: "40px" }}> {category.icon} </span>
									<h4> {category.title} </h4>
								</div>
							))}
						</div>
					)}
				</div>
				<div className='menuContainer'>
					<div className='searchContainer'>
						<MdSearch style={{ color: "rgb(170, 170, 170)" }} />
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
			<Slider {...settings}>
				{images.map((image, index) => (
					<div key={index} className='slide'>
						<img src={image.pcImageUrl} alt={image.title} />
					</div>
				))}
			</Slider>

			<button className='prev' onClick={goToPrevSlide}>
				{"<"}
			</button>
			<button className='next' onClick={goToNextSlide}>
				{">"}
			</button>
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
								<div className='item-container' ref={containerRef}>
									{item.items.map((value) => (
										<div className='item-wrapper' key={value.publication.id}>
											<div className='each'>
												<div className='img-container'>
													{value.publication.media.map((one, index) => (
														<img src={one.uri} alt={one.title} key={index} />
													))}
												</div>
												<p>{value.publication.title}</p>
												<p>
													{value.publication.priceInfo.discountRate !==
														undefined &&
													value.publication.priceInfo.discountRate !== 0 ? (
														<p>
															{value.publication.priceInfo.discountRate}%{" "}
															{value.publication.priceInfo.price} 원
														</p>
													) : (
														<p>{value.publication.priceInfo.price} 원</p>
													)}
												</p>
												<span>
													{value.publication.applyCoupon && (
														<p
															style={{
																backgroundColor: "rgb(228, 228, 228)",
																width: "25%",
																fontSize: "12px",
																padding: "2px 5px",
																borderRadius: "5px",
															}}
														>
															{" "}
															coupon
														</p>
													)}
												</span>
												<span style={{ display: "flex", marginTop: "10px" }}>
													<FaStar
														style={{
															marginRight: "5px",
															fontSize: "15px",
															color: "grey",
														}}
													/>
													{value.publication.rating}
												</span>
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
