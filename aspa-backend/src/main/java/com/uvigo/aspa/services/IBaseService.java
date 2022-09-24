package com.uvigo.aspa.services;

import java.util.Optional;

public interface IBaseService<ResourceType, IdType> {
	
	public Optional<ResourceType> findById(IdType resourceId);
	public Iterable<ResourceType> findAll();
	public ResourceType create(ResourceType resource);
	public ResourceType update(ResourceType resource);
	public void delete(ResourceType resource);
	public void deleteById(IdType resourceId);
}
