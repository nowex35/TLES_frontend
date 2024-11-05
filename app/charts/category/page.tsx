"use client"

import React, { useEffect, useState } from "react";
import { getTicketData } from "@/actions/user";

const CategoryDisplay: React.FC = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getTicketData();
            if (result.success) {
                // チケットデータからカテゴリーのみを抽出
                const categoryList = result.ticketData.map((ticket) => ticket.category);
                setCategories(categoryList);
            } else {
                setError("データの取得に失敗しました");
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>カテゴリー一覧</h1>
            {error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {categories.map((category, index) => (
                        <li key={index}>{category}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CategoryDisplay;