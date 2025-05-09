'use client';

import React, { useEffect, useState } from 'react';
import { Dish } from '../services/dish.service';
import { optionService, GroupOption, Option } from '../services/option.service';
import { cartService } from '../services/cart.service';

interface OptionModalProps {
    dish: Dish;
    onClose: () => void;
    onAddToCart: (item: any) => void;
}

const OptionModal: React.FC<OptionModalProps> = ({ dish, onClose, onAddToCart }) => {
    const [groupOptions, setGroupOptions] = useState<GroupOption[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                setLoading(true);
                const data = await optionService.getGroupOptionsByDishId(dish._id) as GroupOption[];
                // Merge duplicate option groups and remove duplicate options
                const mergedGroups = data.reduce((acc: GroupOption[], group: GroupOption) => {
                    const existingGroup = acc.find(g => g.optionGroupName === group.optionGroupName);
                    if (existingGroup) {
                        // Merge options and remove duplicates
                        const allOptions = [...existingGroup.optionID, ...group.optionID];
                        const uniqueOptions = Array.from(
                            new Map(allOptions.map(opt => [opt.optionName, opt])).values()
                        );
                        existingGroup.optionID = uniqueOptions;
                    } else {
                        acc.push(group);
                    }
                    return acc;
                }, []);
                setGroupOptions(mergedGroups);
                setError(null);
            } catch (err) {
                console.error('Error fetching options:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch options');
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, [dish._id]);

    const handleOptionChange = (option: Option, groupName: string) => {
        setSelectedOptions(prev => {
            // Remove any existing option from the same group
            const filtered = prev.filter(opt => {
                const group = groupOptions.find(g => g.optionID.some(o => o.optionName === opt.optionName));
                return group?.optionGroupName !== groupName;
            });
            // Add the new option
            return [...filtered, option];
        });
    };

    const calculateTotalPrice = () => {
        const optionsPrice = selectedOptions.reduce((sum, option) => sum + option.optionPrice, 0);
        return (dish.dishPrice + optionsPrice) * quantity;
    };

    const handleAddToCart = () => {
        const cartItem = {
            dish,
            selectedOptions,
            quantity,
            note,
            totalPrice: calculateTotalPrice()
        };
        cartService.addToCart(dish, quantity, selectedOptions);
        onAddToCart(cartItem);
        onClose();
    };

    if (loading) return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
    );

    if (error) return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg text-red-500">
                Error: {error}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] flex flex-col">
                <div className="p-4 border-b">
                    <div className="flex items-center gap-4">
                        <img
                            src={dish.dishImg}
                            alt={dish.dishName}
                            className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                            <h3 className="text-lg font-semibold">{dish.dishName}</h3>
                            <p className="text-accent">${dish.dishPrice.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {groupOptions.map((group) => (
                        <div key={group._id} className="mb-4">
                            <h4 className="font-semibold mb-2">{group.optionGroupName}</h4>
                            <div className="space-y-2">
                                {group.optionID.map((option) => (
                                    <label key={option.optionName} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name={group.optionGroupName}
                                            checked={selectedOptions.some(opt => opt.optionName === option.optionName)}
                                            onChange={() => handleOptionChange(option, group.optionGroupName)}
                                            className="w-4 h-4 text-accent"
                                        />
                                        <span>{option.optionName}</span>
                                        {option.optionPrice > 0 && (
                                            <span className="text-accent">+${option.optionPrice.toFixed(2)}</span>
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="mt-4">
                        <label className="block font-semibold mb-2">Quantity</label>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                            >
                                -
                            </button>
                            <span className="text-lg font-semibold">{quantity}</span>
                            <button
                                onClick={() => setQuantity(prev => prev + 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block font-semibold mb-2">Note to kitchen</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            rows={3}
                            placeholder="Add any special instructions..."
                        />
                    </div>
                </div>

                <div className="p-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Total:</span>
                        <span className="text-lg font-semibold text-accent">
                            ${calculateTotalPrice().toFixed(2)}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OptionModal; 