import ItemCard from "@/components/ItemCard";
import { Item } from "@/types";
import { useState } from "react";
import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
const STARTER_ITEMS: Item[] = [
	{ id: "1", title: "Blue water bottle", place: "Library, 2nd floor" },
	{ id: "2", title: "Student card", place: "Cafeteria" },
	{ id: "3", title: "USB-C charger", place: "Room B12" },
];
export default function Index() {
	const [items, setItems] = useState<Item[]>(STARTER_ITEMS);
	const [title, setTitle] = useState("");
	const [place, setPlace] = useState("");
	const canAdd = title.trim() !== "" && place.trim() !== "";
	function addItem() {
		if (!canAdd) return;
		const newItem: Item = {
			id: Date.now().toString(),
			title: title.trim(),
			place: place.trim(),
		};
		setItems([newItem, ...items]);
		setTitle("");
		setPlace("");
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
					style={[styles.button, !canAdd && styles.buttonDisabled]}
					onPress={addItem}
					disabled={!canAdd}
				>
					<Text style={styles.buttonText}>Add item</Text>
				</Pressable>
			</View>
			<FlatList
				data={items}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<ItemCard title={item.title} place={item.place} />
				)}
				ItemSeparatorComponent={Separator}
				ListEmptyComponent={<Text>Nothing reported yet.</Text>}
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
	separator: {
		height: 10,
	},
});
