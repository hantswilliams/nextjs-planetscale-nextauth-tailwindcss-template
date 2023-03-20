'import client';

import { useState } from 'react';

import {
    Card,
    Text,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Flex,
    Button,
    Icon,
    Title,
    Divider,
    RangeBar,
    List, 
    ListItem,
} from '@tremor/react';

import {
    InformationCircleIcon,
    CodeBracketSquareIcon,
    CpuChipIcon,
    ShieldCheckIcon,
    ShieldExclamationIcon,
    ArrowPathRoundedSquareIcon,
} from '@heroicons/react/24/solid';

import { fetchCognitionResults } from '../../../demo-amazon/cognition';



type CategoryProps = {
    modelmetadata: string;
    modelcleandata: string;
    modelversion: string;
    modelsubtype: string;
    imageuid: string;
    medial_url: string;
    displayReload: boolean;
    categoryName1: string;
    categoryScore1: number;
    categoryName2: string;
    categoryScore2: number;
    categoryName3: string;
    categoryScore3: number;
    categoryName4: string;
    categoryScore4: number;
    categoryName5: string;
    categoryScore5: number;
    categoryName6: string;
    categoryScore6: number;
    categoryName7: string;
    categoryScore7: number;
    categoryName8: string;
    categoryScore8: number;
    categoryName9: string;
    categoryScore9: number;
    categoryName10: string;
    categoryScore10: number;

};

const ResultsCategoryComponent = ({ 
    modelmetadata,
    modelcleandata,
    modelversion,
    modelsubtype,
    imageuid,
    medial_url,
    displayReload,
    categoryName1, 
    categoryScore1, 
    categoryName2,
    categoryScore2,
    categoryName3,
    categoryScore3,
    categoryName4,
    categoryScore4,
    categoryName5,
    categoryScore5,
    categoryName6,
    categoryScore6,
    categoryName7,
    categoryScore7,
    categoryName8,
    categoryScore8,
    categoryName9,
    categoryScore9,
    categoryName10,
    categoryScore10,
}: CategoryProps) => {

    const [Loading, setLoading] = useState<boolean>(false);

    const categories = [
        {
            title: categoryName1,
            metric: categoryScore1,
            percentageValue: categoryScore1,
            minMetric: 0,
            minPercentageValue: 0,
            maxMetric: categoryScore1,
            maxPercentageValue: categoryScore1,
            icon: ShieldCheckIcon,
        },
        {
            title: categoryName2,
            metric: categoryScore2,
            percentageValue: categoryScore2,
            minMetric: 0,
            minPercentageValue: 0,
            maxMetric: categoryScore2,
            maxPercentageValue: categoryScore2,
            icon: ShieldCheckIcon,
        },
        {
            title: categoryName3,
            metric: categoryScore3,
            percentageValue: categoryScore3,
            minMetric: 0,
            minPercentageValue: 0,
            maxMetric: categoryScore3,
            maxPercentageValue: categoryScore3,
            icon: ShieldCheckIcon,
        },
        {
            title: categoryName4,
            metric: categoryScore4,
            percentageValue: categoryScore4,
            minMetric: 0,
            minPercentageValue: 0,
            maxMetric: categoryScore4,
            maxPercentageValue: categoryScore4,
            icon: ShieldCheckIcon,
        },
        {
            title: categoryName5,
            metric: categoryScore5,
            percentageValue: categoryScore5,
            minMetric: 0,
            minPercentageValue: 0,
            maxMetric: categoryScore5,
            maxPercentageValue: categoryScore5,
            icon: ShieldCheckIcon,
        },
        {
            title: categoryName6,
            metric: categoryScore6,
            percentageValue: categoryScore6,
            minMetric: 0,
            minPercentageValue: 0,
            maxMetric: categoryScore6,
            maxPercentageValue: categoryScore6,
            icon: ShieldCheckIcon,
        },
        {
            title: categoryName7,
            metric: categoryScore7,
            percentageValue: categoryScore7,
            minMetric: 0,
            minPercentageValue: 0,
            maxMetric: categoryScore7,
            maxPercentageValue: categoryScore7,
            icon: ShieldCheckIcon,
        },
        {
            title: categoryName8,
            metric: categoryScore8,
            percentageValue: categoryScore8,
            minMetric: 0,
            minPercentageValue: 0,
            maxMetric: categoryScore8,
            maxPercentageValue: categoryScore8,
            icon: ShieldCheckIcon,
        },
        {
            title: categoryName9,
            metric: categoryScore9,
            percentageValue: categoryScore9,
            minMetric: 0,
            minPercentageValue: 0,
            maxMetric: categoryScore9,
            maxPercentageValue: categoryScore9,
            icon: ShieldCheckIcon,
        },
        {
            title: categoryName10,
            metric: categoryScore10,
            percentageValue: categoryScore10,
            minMetric: 0,
            minPercentageValue: 0,
            maxMetric: categoryScore10,
            maxPercentageValue: categoryScore10,
            icon: ShieldCheckIcon,
        },
    ];

    const performCognition = async (imageuid: string, medial_url: string) => {
        setLoading(true);
        console.log('performing cognition for: ', imageuid);
        console.log('medial_url: ', medial_url);
        try {
            const results = await new Promise((resolve, reject) => {
              fetchCognitionResults(medial_url, imageuid)
                .then((data) => resolve(data))
                .catch((error) => reject(error));
            });
            console.log('results: ', results);
          } catch (error) {
            console.error(error);
          } 
        window.location.reload();
    }


  return (

    // if loading, show loading spinner
    Loading ? (
        <div className="flex justify-center">
            <div className="flex flex-col items-center justify-center">
                <p> Performing Cognition for: </p>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-cyan-600 bg-cyan-200 uppercase last:mr-0 mr-1 mt-1">
                        {imageuid}
                </span>
                <button disabled type="button" className="mt-5 py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                    </svg>
                    Performing...
                </button>
                    
            </div>
        </div>
    ) : (        
        <Card className="max-w-md mx-auto">
            <div className="items-center justify-center">
            {/* maxWidth="max-w-md" */}

            <Flex justifyContent="start"> 
                    {/* spaceX="-space-x-0.5" alignItems="items-center"> */}
                <Title> Moderation Results </Title>
                <Icon
                    icon={ InformationCircleIcon }
                    size="sm"
                    color="gray"
                    tooltip="Shows content moderation likelihood (gray bar) that the image belongs to that particular category. The closer it is to the right, the higher the likelihood it belongs to that category. While the closer it is to the left, the lower the likelihood it belongs to that category. "
                />
            </Flex>


            <Text> Categories:  </Text>

            <div className="mt-2">
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0"> 
                    {modelversion && (
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-cyan-600 bg-cyan-200 uppercase last:mr-0 mr-1 mt-1">
                            API: {modelversion}   
                        </span>
                    )}
                    {modelsubtype && (
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200 uppercase last:mr-0 mr-1 mt-1">
                            Version: {modelsubtype}
                        </span>
                    )}
                    {imageuid && (
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 uppercase last:mr-0 mr-1 mt-1">
                            Image UID: {imageuid}
                        </span>
                    )}
                </dd>
            </div>

            <Divider />




                    {/* { categories
                        .sort((a, b) => b.metric - a.metric) // sort the array in descending order based on metric
                        .map((item) => (
                        <Flex key={ item.title } justifyContent="start">
                            <div className="mt-6">
                                <Icon
                                    icon={ item.metric > 50 ? ShieldExclamationIcon : ShieldCheckIcon}
                                    // if item.metric is greater than 50, then color is green, else red
                                    color={ item.metric > 50 ? 'red' : 'green' }
                                    variant="shadow"
                                    size="lg"
                                />
                                    <div className="mt-2"> 
                                    <Flex>
                                        <Text className=""><Bold>{ item.title }</Bold></Text>
                                        <Text>{ item?.metric?.toString().slice(0, 5)}</Text> 
                                    </Flex>
                                    <RangeBar
                                        percentageValue={ item.percentageValue }
                                        minPercentageValue={ item.minPercentageValue }
                                        maxPercentageValue={ item.maxPercentageValue }
                                        markerTooltip={ `${item.percentageValue}%` }
                                        rangeTooltip={
                                            `${item.minMetric} (${item.minPercentageValue}%)
                                            - ${item.maxMetric} (${item.maxPercentageValue}%)`
                                        }
                                    />
                                    </div>
                            </div>
                        </Flex>
                    )) } */}



                    { categories
                        .sort((a, b) => b.metric - a.metric) // sort the array in descending order based on metric
                        .map((item) => (
                        <div key={item.title}>
                            <List>
                                <ListItem>
                                    <Flex justifyContent="start" className="truncate space-x-2.5">
                                        <Icon
                                                icon={ item.metric > 50 ? ShieldExclamationIcon : ShieldCheckIcon}
                                                // if item.metric is greater than 50, then color is green, else red
                                                color={ item.metric > 50 ? 'red' : 'green' }
                                                variant="shadow"
                                                size="lg"
                                            />                                
                                        <Text className="truncate">{item.title}</Text>
                                    </Flex>
                                    <Text>{ item?.metric?.toString().slice(0, 5)} %</Text>
                                </ListItem>
                            </List>  
                            <Flex> 
                                <RangeBar
                                    percentageValue={ item.percentageValue }
                                    minPercentageValue={ item.minPercentageValue }
                                    maxPercentageValue={ item.maxPercentageValue }
                                    markerTooltip={ `${item.percentageValue}%` }
                                    rangeTooltip={
                                        `${item.minMetric} (${item.minPercentageValue}%)
                                        - ${item.maxMetric} (${item.maxPercentageValue}%)`
                                }
                                />
                            </Flex>
                            <Divider />                              
                        </div>
                    )) }


                    { displayReload && (
                        <Button
                            size="sm"
                            color='blue'
                            onClick={() => performCognition(imageuid, medial_url)}
                            icon={ ArrowPathRoundedSquareIcon }
                            iconPosition="right"
                            variant="secondary"
                        >
                            Rerun Analysis
                        </Button>
                    )}

                    <div className="mt-5">
                        <Flex justifyContent='start'>
                            <Icon
                                icon={ CodeBracketSquareIcon }
                                size="sm"
                                color="blue"
                                tooltip={ modelmetadata }
                            />
                            <Icon
                                icon={ CpuChipIcon }
                                size="sm"
                                color="blue"
                                tooltip={ modelcleandata }
                            />    
                        </Flex>
                    </div>


  



            </div>
        </Card>

    )

  );
};

export default ResultsCategoryComponent;