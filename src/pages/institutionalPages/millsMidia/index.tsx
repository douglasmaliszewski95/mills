import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { MachinesAndPlatforms } from "@/components/Home/MachinesAndPlatforms/MachinesAndPlatforms";
import { MillsNewsComponent } from "@/components/InstitutionalComponents/MillsNewsComponent/MillsNewsComponent";
import { Pagination } from "@/components/InstitutionalComponents/MillsNewsComponent/Pagination";
import { SearchNewsComponent } from "@/components/InstitutionalComponents/MillsNewsComponent/SearchNewsComponent";
import { PostProps } from "@/components/InstitutionalComponents/MillsNewsComponent/types";
import { PressRoom } from "@/components/InstitutionalComponents/PressRoom/PressRoom";
import { RoomProps } from "@/components/InstitutionalComponents/PressRoom/types";
import { Banner } from "@/components/shared/Banner/Banner";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { InformationWithButton } from "@/components/shared/InformationWithButton/InformationWithButton";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { usDateFunc } from "@/utils/format-day-time";
import { getImageSrc } from "@/utils/images";
import { isEmpty } from "lodash";
import { Fragment, useCallback, useEffect, useState } from "react";

const MillsMidia = () => {
  const [pageContent, setPageContent] = useState<any>();
  const [textContent, setTextContent] = useState<any>();
  const [loadig, setLoading] = useState(true);
  const [posts, setPosts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fixedPosts, setFixedPosts] = useState<any>();

  const { isMobile } = useScreenWidth();

  const getAllPosts = (listOfNews: any, portaisImages: any) => {
    let postsArray: PostProps[] = [];

    const searchLogoNews = (title: string) => {
      
      let portalSrc =  ''
      portaisImages.map((portal : any) => {
        if(title.toLowerCase() === portal?.fields?.content_title.toLowerCase()) {
         
          portalSrc = portal?.fields?.native?.links[0]?.href
        }
      })

      return portalSrc
    }  
   
    listOfNews?.map((item: any) => {            
      postsArray.push({
        data: item?.fields?.date?.value,
        image: getImageSrc(isMobile ? item?.fields : item?.fields),
        text: item?.fields?.content_text,
        title: item?.fields?.content_title,
        link: item?.fields?.href_attribute,
        portalImage: searchLogoNews(item?.fields?.content_title),
      });
    });

    const formattedPosts = postsArray.sort((a: any, b: any) => {
      const data1: any = usDateFunc(a.data);
      const data2: any = usDateFunc(b.data);
      return data1 - data2;
    });

    setFixedPosts(formattedPosts);
    setPosts(formattedPosts);
  };

  useEffect(() => {
    const getPageContent = async () => {
      const content = await getCMSContent("mills_na_midia");
      const contentText = await getCMSText("mills_na_midia");

      setPageContent(content);
      setTextContent(contentText);
      getAllPosts(content?.list_of_news_text, content?.logo_portais);
      setLoading(false);
    };

    getPageContent();
  }, []);

  const formatRooms = () => {
    let formattedRooms: RoomProps[] = [];

    textContent?.press_room_text?.map((room: any) => {
      formattedRooms?.push({
        email: room?.fields?.text_field[1],
        name: room?.fields?.text_field[0],
        phone: room?.fields?.text_field[2],
        title: room?.fields?.subtitle[0],
      });
    });

    return formattedRooms;
  };

  const searchNews = (key: string) => {
    setLoading(true);
    setErrorMessage("");

    const postNewArr: PostProps[] = [];

    if (key) {
      if (key.includes(" ")) {
        const searchTerms = key.split(" ");
        searchTerms.map((term: string) => {
          if (!isEmpty(term)) {
            const searchYear = Number(term);
            if (term.length === 4 && !isNaN(searchYear)) {
              fixedPosts.map((post: PostProps) => {
                const newsYear = post.data.split("-")[0];
                let achou = false;
                if (searchYear === Number(newsYear)) {
                  postNewArr.map((postArr1: PostProps) => {
                    if (post.title === postArr1.title) {
                      achou = true;
                    }
                  });
                }

                if (!achou) {
                  postNewArr.push(post);
                }
              });
            } else {
              fixedPosts.map((fixedPost: PostProps) => {
                let achou = false;
                if (
                  fixedPost.title.toUpperCase().includes(term.toUpperCase()) ||
                  fixedPost.text?.toUpperCase().includes(term?.toUpperCase())
                ) {
                  postNewArr.map((postArr: PostProps) => {
                    if (fixedPost.title === postArr.title) {
                      achou = true;
                    }
                  });

                  if (!achou) {
                    postNewArr.push(fixedPost);
                  }
                }
              });
            }
          }
        });
      } else {
        fixedPosts?.map((post: PostProps) => {
          if (
            post?.title?.toUpperCase().includes(key?.toUpperCase()) ||
            post?.text?.toUpperCase().includes(key?.toUpperCase())
          ) {
            postNewArr.push(post);
          }
        });
      }

      if (isEmpty(postNewArr)) {
        setErrorMessage(
          "Ops, não foi possível encontrar nenhuma notícia, tente buscar novamente"
        );
      } else {
        setPosts(
          postNewArr.sort((a: any, b: any) => {
            const data1: any = usDateFunc(a.data);
            const data2: any = usDateFunc(b.data);
            return data1 - data2;
          })
        );
        setCurrentPage(1);
      }
    } else {
      setPosts(
        fixedPosts?.sort((a: any, b: any) => {
          const data1: any = usDateFunc(a.data);
          const data2: any = usDateFunc(b.data);
          return data1 - data2;
        })
      );
      setCurrentPage(1);
    }

    setLoading(false);
  };

  const spinnigLoading = () => {
    return (
      <div
        role="status"
        className="w-full flex items-center h-full my-12 justify-center"
      >
        <svg
          aria-hidden="true"
          className="inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-500"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  };

  //Get Currrent Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Fragment>
      <Header />

      <main className="relative">
        <Banner
          backgroundImage={getImageSrc(
            isMobile
              ? pageContent?.banner_mills_in_the_media[0]?.mobileObj?.fields
              : pageContent?.banner_mills_in_the_media[0]?.fields
          )}
          title={
            pageContent?.banner_mills_in_the_media[0]?.fields.content_title
          }
          subTitle="Mills na Mídia"
        />

        <SearchNewsComponent
          inputValue={inputValue}
          onClick={() => {
            searchNews(inputValue);
          }}
          setInputValue={(e: any) => setInputValue(e)}
        />

        {loadig ? (
          spinnigLoading()
        ) : (
          <>
            {errorMessage ? (
              <div className="tablet:px-4 w-full py-8 flex items-center justify-center">
                <h1 className="text-green-800 tablet:text-sm font-semibold text-2xl">
                  {errorMessage}
                </h1>
              </div>
            ) : (
              <>
                <MillsNewsComponent posts={currentPosts} />

                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={posts.length}
                  currentPage={currentPage}
                  nextPage={() => {
                    if (currentPage < posts.length / postsPerPage)
                      setCurrentPage(currentPage + 1);
                  }}
                  returnPage={() => {
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                />
              </>
            )}
          </>
        )}

        <InformationWithButton
          showDna={false}
          buttonTitle={textContent?.access_media_kit[0]?.fields?.buttonText[0]}
          description={textContent?.access_media_kit[0]?.fields?.text_field[0]}
          title={textContent?.access_media_kit[0]?.fields?.title}
          theme="bg-green-800"
          buttonColor="bg-orange-500"
          width="w-[65%]"
          buttonTextColor="text-white"
          paddingY="py-6"
          buttonLink={textContent?.access_media_kit[0]?.fields?.hrefButton[0]}
        />

        <PressRoom rooms={formatRooms()} title="Sala de Imprensa" />

        <MachinesAndPlatforms />

      </main>
      <Footer />
    </Fragment>
  );
};

export default MillsMidia;
