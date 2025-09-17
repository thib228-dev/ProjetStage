// src/hooks/useEtudiants.js
import { useState, useEffect, useCallback } from "react";
import etudiantService from "@/services/etudiants/etudiantService";

export const useEtudiants = (filters = {}) => {
  const [etudiants, setEtudiants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 1,
  });

  const fetchEtudiants = useCallback(async () => {
    setLoading(true);
    try {
      const filtersToUse = {
        ...filters,
        page: filters.page || pagination.page,
        page_size: filters.pageSize || pagination.pageSize,
      };

      const data = await etudiantService.getAllEtudiants(filtersToUse);

      setEtudiants(data.results || []);
      setPagination({
        page: filtersToUse.page,
        pageSize: filtersToUse.page_size,
        total: data.count || 0,
        totalPages: data.total_pages || 1,
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.pageSize]);

  useEffect(() => {
    fetchEtudiants();
  }, [fetchEtudiants]);

  return { etudiants, loading, error, pagination, fetchEtudiants, setPagination };
};
