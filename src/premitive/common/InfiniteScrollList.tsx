import { Box, CircularProgress, ListItemText, List, ListItem } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

type InfiniteScrollListProps = {
    items: any[];
    next: () => Promise<void>;
    hasMore: boolean;
    renderItem: (item: any) => React.ReactNode;
    loader?: React.ReactNode;
    endMessage?: React.ReactNode;
};

const InfiniteScrollList: React.FC<InfiniteScrollListProps> = ({
    items,
    next,
    hasMore,
    renderItem,
    loader,
    endMessage,
}) => {
    return (
        <Box sx={{ width: '100%', maxWidth: 1600, margin: 'auto' }}>
            <InfiniteScroll
                dataLength={items.length}
                next={next}
                hasMore={hasMore}
                loader={loader || (
                    <Box display="flex" justifyContent="center" p={2}>
                        <CircularProgress />
                    </Box>
                )}
                endMessage={endMessage || (
                    <Box display="flex" justifyContent="center" p={2}>
                        <ListItemText primary="No more items to load." />
                    </Box>
                )}
            >
                <List>
                    {items.map((item, index) => (
                        <ListItem key={index} divider>
                            {renderItem(item)}
                        </ListItem>
                    ))}
                </List>
            </InfiniteScroll>
        </Box>
    );
};

export default InfiniteScrollList;