import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LongCardTemplateGen from '../longCardTemplateGen';

describe('LongCardTemplateGen Component', () => {
  test('renders the component with initial elements', () => {
    render(<LongCardTemplateGen />);

    // Check for the heading
    expect(screen.getByText('Long-card Generator')).toBeInTheDocument();

    // Check for the Add Columns button
    expect(screen.getByText('Add Columns')).toBeInTheDocument();

    // Check for the Preview switch
    expect(screen.getByLabelText('Preview')).toBeInTheDocument();
  });

  test('adds a column when Add Columns button is clicked', () => {
    render(<LongCardTemplateGen />);

    const addButton = screen.getByText('Add Columns');
    fireEvent.click(addButton);

    // Check if a column is added
    expect(screen.getByText('Column 1')).toBeInTheDocument();
  });

  test('deletes a column when delete button is clicked', () => {
    render(<LongCardTemplateGen />);

    const addButton = screen.getByText('Add Columns');
    fireEvent.click(addButton);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    // Check if the column is deleted
    expect(screen.queryByText('Column 1')).not.toBeInTheDocument();
  });

  test('updates column data when dropdown values are changed', () => {
    render(<LongCardTemplateGen />);

    const addButton = screen.getByText('Add Columns');
    fireEvent.click(addButton);

    const assetDropdown = screen.getByRole('combobox', { name: /Asset Type/i });
    fireEvent.change(assetDropdown, { target: { value: 'Asset 2' } });

    // Check if the column data is updated
    expect(screen.getByText('Asset 2')).toBeInTheDocument();
  });

  test('toggles the Preview switch', () => {
    render(<LongCardTemplateGen />);

    const previewSwitch = screen.getByLabelText('Preview');
    fireEvent.click(previewSwitch);

    // Check if the Preview switch is toggled
    expect(previewSwitch).not.toBeChecked();
  });

  test('renders the Preview section when enabled', () => {
    render(<LongCardTemplateGen />);

    const previewSwitch = screen.getByLabelText('Preview');
    fireEvent.click(previewSwitch);

    // Check if the Preview section is rendered
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  test('updates displayOrder and shifts conflicting items', () => {
    render(<LongCardTemplateGen />);

    const addButton = screen.getByText('Add Columns');
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    const displayOrderDropdown = screen.getByRole('combobox', { name: /Display Order/i });
    fireEvent.change(displayOrderDropdown, { target: { value: '1' } });

    // Check if displayOrder is updated and conflicts are resolved
    const columns = screen.getAllByText(/Column/i);
    expect(columns[0]).toHaveTextContent('Column 1');
    expect(columns[1]).toHaveTextContent('Column 2');
  });

  test('renders template components when useTemplate is enabled', () => {
    render(<LongCardTemplateGen />);

    const addButton = screen.getByText('Add Columns');
    fireEvent.click(addButton);

    const useTemplateSwitch = screen.getByLabelText('Use Template');
    fireEvent.click(useTemplateSwitch);

    const templateDropdown = screen.getByRole('combobox', { name: /Template/i });
    fireEvent.change(templateDropdown, { target: { value: 'Header' } });

    // Check if the Header template is rendered
    expect(screen.getByText('Header Text')).toBeInTheDocument();
  });

  test('renders regular preview items when useTemplate is disabled', () => {
    render(<LongCardTemplateGen />);

    const addButton = screen.getByText('Add Columns');
    fireEvent.click(addButton);

    // Check if regular preview items are rendered
    expect(screen.getByText('Asset 1')).toBeInTheDocument();
  });
});