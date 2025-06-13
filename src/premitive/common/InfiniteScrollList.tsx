import { Box, CircularProgress, ListItemText, List, ListItem, Checkbox, Typography } from "@mui/material";
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
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    padding: 1,
                                    border: '1px solid #ccc',
                                    borderRadius: 2,
                                }}
                            >
                                {/* Checkbox */}
                                <Checkbox />

                                {/* Name of the item */}
                                <Typography sx={{ flex: 1, marginLeft: 1 }}>
                                    {renderItem(item)}
                                </Typography>

                                {/* Placeholder */}
                                <Typography sx={{ marginLeft: 2, color: 'gray' }}>
                                    
                                </Typography>

                                {/* Version */}
                                <Typography sx={{ marginLeft: 2, fontWeight: 'bold' }}>
                                    Version 1.0
                                </Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </InfiniteScroll>
        </Box>
    );
};

export default InfiniteScrollList;