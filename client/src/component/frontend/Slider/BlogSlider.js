import React from "react";
import BLOG2 from "../../../images/img/blog/medium-size/2.jpg";
import BLOG3 from "../../../images/img/blog/medium-size/3.jpg";
import BLOG1 from "../../../images/img/blog/medium-size/1.jpg";
import Slider from "react-slick";
export default function BlogSlider() {
  const BlogSetting = {
    slidesToShow: 3,
    autoplaySpeed: 3000,
    speed: 500,
    autoplay: true,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="latest-blog-area">
      <div className="container container-default custom-area">
        <div className="row">
          <div className="col-lg-5 m-auto text-center col-custom">
            <div className="section-content">
              <h2 className="title-1 text-uppercase">Latest Blog</h2>
              <div className="desc-content">
                <p>
                  If you want to know about the organic product then keep an eye
                  on our blog.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-custom">
            <Slider className="obrien-slider" {...BlogSetting}>
              <div className="single-blog">
                <div className="single-blog-thumb">
                  <a href="blog.html">
                    <img src={BLOG1} alt="Blog-1" />
                  </a>
                </div>
                <div className="single-blog-content position-relative">
                  <div className="post-date text-center border rounded d-flex flex-column position-absolute">
                    <span>14</span>
                    <span>01</span>
                  </div>
                  <div className="post-meta">
                    <span className="author">Author: Obrien Demo Admin</span>
                  </div>
                  <h2 className="post-title">
                    <a href="blog.html">
                      There Are Many Variation of Passages of Lorem Ipsum
                      Available
                    </a>
                  </h2>
                  <p className="desc-content">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classNameical Latin
                    literature from 45 BC, making...
                  </p>
                </div>
              </div>
              <div className="single-blog">
                <div className="single-blog-thumb">
                  <a href="blog.html">
                    <img src={BLOG2} alt="Blog-2" />
                  </a>
                </div>
                <div className="single-blog-content position-relative">
                  <div className="post-date text-center border rounded d-flex flex-column position-absolute">
                    <span>14</span>
                    <span>01</span>
                  </div>
                  <div className="post-meta">
                    <span className="author">Author: Obrien Demo Admin</span>
                  </div>
                  <h2 className="post-title">
                    <a href="blog.html">
                      There Are Many Variation of Passages of Lorem Ipsum
                      Available
                    </a>
                  </h2>
                  <p className="desc-content">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classNameical Latin
                    literature from 45 BC, making...
                  </p>
                </div>
              </div>
              <div className="single-blog">
                <div className="single-blog-thumb">
                  <a href="blog.html">
                    <img src={BLOG3} alt="Blog-3" />
                  </a>
                </div>
                <div className="single-blog-content position-relative">
                  <div className="post-date text-center border rounded d-flex flex-column position-absolute">
                    <span>14</span>
                    <span>01</span>
                  </div>
                  <div className="post-meta">
                    <span className="author">Author: Obrien Demo Admin</span>
                  </div>
                  <h2 className="post-title">
                    <a href="blog.html">
                      The Standard Chunk Of Lorem Ipsum Used Since
                    </a>
                  </h2>
                  <p className="desc-content">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classNameical Latin
                    literature from 45 BC, making...
                  </p>
                </div>
              </div>
              <div className="single-blog">
                <div className="single-blog-thumb">
                  <a href="blog.html">
                    <img src={BLOG1} alt="Blog-4" />
                  </a>
                </div>
                <div className="single-blog-content position-relative">
                  <div className="post-date text-center border rounded d-flex flex-column position-absolute">
                    <span>14</span>
                    <span>01</span>
                  </div>
                  <div className="post-meta">
                    <span className="author">Author: Obrien Demo Admin</span>
                  </div>
                  <h2 className="post-title">
                    <a href="blog.html">
                      There Are Many Variation of Passages of Lorem Ipsum
                      Available
                    </a>
                  </h2>
                  <p className="desc-content">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classNameical Latin
                    literature from 45 BC, making...
                  </p>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
