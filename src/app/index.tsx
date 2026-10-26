import ItemCard from "@/components/ItemCard";
import { fetchItems, uploadItem } from "@/api/items";
import { Item } from "@/types";
import { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

export default function Index() {
	const [items, setItems] = useState<Item[]>([]);
	const [title, setTitle] = useState("");
	const [place, setPlace] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isLoadError, setIsLoadError] = useState(false);
	const canAdd = title.trim() !== "" && place.trim() !== "";

	const requestItems = useCallback(() => fetchItems(), []);
	const handleLoadedItems = useCallback((loadedItems: Item[]) => {
		setItems(loadedItems);
		setError(null);
		setIsLoadError(false);
	}, []);
	const handleLoadError = useCallback((loadError: unknown) => {
		setError(
			loadError instanceof Error
				? loadError.message
				: "Unable to retrieve items.",
		);
		setIsLoadError(true);
	}, []);
	const finishLoading = useCallback(() => {
		setIsLoading(false);
	}, []);

	useEffect(() => {
		let isActive = true;
		void requestItems()
			.then((loadedItems) => {
				if (isActive) handleLoadedItems(loadedItems);
			})
			.catch((loadError: unknown) => {
				if (isActive) handleLoadError(loadError);
			})
			.finally(() => {
				if (isActive) finishLoading();
			});

		return () => {
			isActive = false;
		};
	}, [finishLoading, handleLoadError, handleLoadedItems, requestItems]);

	function retryLoadingItems() {
		setIsLoading(true);
		setError(null);
		setIsLoadError(false);
		void requestItems()
			.then(handleLoadedItems)
			.catch(handleLoadError)
			.finally(finishLoading);
	}

	async function addItem() {
		if (!canAdd || isSaving) return;

		setIsSaving(true);
		setError(null);
		setIsLoadError(false);
		try {
			const newItem = await uploadItem({
				title: title.trim(),
				place: place.trim(),
			});
			setItems((currentItems) => [newItem, ...currentItems]);
			setTitle("");
			setPlace("");
		} catch (saveError) {
			setError(
				saveError instanceof Error
					? saveError.message
					: "Unable to save item.",
			);
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<View style={styles.screen}>
			<Text style={styles.count}>{items.length} items reported</Text>
			<View style={styles.form}>
				<TextInput
					style={styles.input}
					placeholder="What did you find?"
					value={title}
					onChangeText={setTitle}
				/>
				<TextInput
					style={styles.input}
					placeholder="Where?"
					value={place}
					onChangeText={setPlace}
				/>
				<Pressable
					style={[
						styles.button,
						(!canAdd || isSaving) && styles.buttonDisabled,
					]}
					onPress={() => void addItem()}
					disabled={!canAdd || isSaving}
				>
					<Text style={styles.buttonText}>
						{isSaving ? "Saving..." : "Add item"}
					</Text>
				</Pressable>
			</View>
			{error && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{error}</Text>
					{isLoadError && items.length === 0 && (
						<Pressable onPress={retryLoadingItems}>
							<Text style={styles.retryText}>Retry</Text>
						</Pressable>
					)}
				</View>
			)}
			<FlatList
				data={items}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<ItemCard title={item.title} place={item.place} />
				)}
				ItemSeparatorComponent={Separator}
				ListEmptyComponent={
					isLoading ? (
						<ActivityIndicator accessibilityLabel="Loading items" />
					) : (
						<Text>Nothing reported yet.</Text>
					)
				}
			/>
		</View>
	);
}

function Separator() {
	return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 16,
		backgroundColor: "#f3f4f6",
	},
	count: {
		color: "#6b7280",
		marginBottom: 12,
	},
	form: {
		gap: 10,
		marginBottom: 16,
	},
	input: {
		backgroundColor: "#ffffff",
		borderWidth: 1,
		borderColor: "#d1d5db",
		borderRadius: 10,
		padding: 11,
		fontSize: 16,
	},
	button: {
		backgroundColor: "#111556",
		borderRadius: 10,
		padding: 14,
		alignItems: "center",
	},
	buttonDisabled: {
		opacity: 0.4,
	},
	buttonText: {
		color: "#ffffff",
		fontWeight: "600",
		fontSize: 16,
	},
	errorContainer: {
		marginBottom: 12,
	},
	errorText: {
		color: "#b91c1c",
	},
	retryText: {
		color: "#111556",
		fontWeight: "600",
		marginTop: 6,
	},
	separator: {
		height: 10,
	},
});
