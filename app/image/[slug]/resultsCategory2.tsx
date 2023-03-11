import {
    Card,
    Text,
    Footer,
    Flex,
    ButtonInline,
    Icon,
    Title,
    Bold,
    RangeBar,
    Block,
} from '@tremor/react';

import {
    InformationCircleIcon,
    CodeBracketSquareIcon,
    CpuChipIcon,
    ShieldCheckIcon,
    ShieldExclamationIcon
} from '@heroicons/react/24/solid';


type CategoryProps = {
    modelmetadata: string;
    modelcleandata: string;
    modelversion: string;
    modelsubtype: string;
    imageuid: string;
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

const ResultsCategory2 = ({ 
    modelmetadata,
    modelcleandata,
    modelversion,
    modelsubtype,
    imageuid,
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


  return (
    <Card maxWidth="max-w-md">
        <Flex justifyContent="justify-start" spaceX="-space-x-0.5" alignItems="items-center">
            <Title> Content Moderation Summary </Title>
            <Icon
                icon={ InformationCircleIcon }
                size="sm"
                color="gray"
                tooltip="Shows content moderation likelihood (gray bar) that the image belongs to that particular category. The closer it is to the right, the higher the likelihood it belongs to that category. While the closer it is to the left, the lower the likelihood it belongs to that category. "
            />
        </Flex>
        <Text> Categories &bull; as of 2023 </Text>

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


        { categories.map((item) => (
            <Flex key={ item.title } justifyContent="justify-start" spaceX="space-x-6" marginTop="mt-6">
                <Icon
                    icon={ item.metric > 50 ? ShieldExclamationIcon : ShieldCheckIcon}
                    // if item.metric is greater than 50, then color is green, else red
                    color={ item.metric > 50 ? 'red' : 'green' }
                    variant="shadow"
                    size="lg"
                />
                <Block spaceY="space-y-2">
                    <Flex>
                        <Text><Bold>{ item.title }</Bold></Text>
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
                </Block>
            </Flex>
        )) }
        <Footer>
            {/* <ButtonInline
                size="sm"
                text="View details"
                icon={ UsersIcon }
                iconPosition="right"
            /> */}
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
        </Footer>
    </Card>

  );
};

export default ResultsCategory2;