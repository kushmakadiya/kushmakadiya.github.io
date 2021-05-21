<%@ Page Title="" Language="C#" MasterPageFile="~/Content/AdminPanel.master" AutoEventWireup="true" CodeFile="ContactList.aspx.cs" Inherits="AdminPanel_Contact_ContactList" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphHead" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphContent" runat="Server">
    <div class="row">
        <div class="col-md-2">
            <h5 class="font-weight-bold text-primary">Contact List</h5>
            <hr />
        </div>
        <div class="col-md-2 offset-md-8 text-right">
            <asp:Button ID="btnAdd" runat="server" Text="Add Contact" CssClass="btn btn-info" OnClick="btnAdd_Click" />
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <asp:Label ID="lblErrorMessage" runat="server" CssClass="text-danger" EnableViewState="false" />
            <asp:GridView ID="gvContact" runat="server" AutoGenerateColumns="false" CssClass="table text-nowrap table-bordered table-responsive" OnRowCommand="gvContact_RowCommand">
                <Columns>
                    <asp:BoundField DataField="ContactName" HeaderText="Contact Name"/>
                    <asp:BoundField DataField="Address" HeaderText="Address" />
                    <asp:BoundField DataField="CityName" HeaderText="City" />
                    <asp:BoundField DataField="StateName" HeaderText="State" />
                    <asp:BoundField DataField="CountryName" HeaderText="Country" />
                    <asp:BoundField DataField="Pincode" HeaderText="Pincode" />
                    <asp:BoundField DataField="MobileNo" HeaderText="MobileNo" />
                    <asp:BoundField DataField="Email" HeaderText="Emali" />
                    <asp:BoundField DataField="Gender" HeaderText="Gender" />
                    <asp:BoundField DataField="BirthDate" HeaderText="Birth Date"/>
                    <asp:BoundField DataField="BloodGroupName" HeaderText="Bloop Group" />
                    <asp:BoundField DataField="Profession" HeaderText="Profession" />
                    <asp:BoundField DataField="ContactCategory" HeaderText="Contact Category" />
                    <asp:TemplateField HeaderText="Oprations">
                        <ItemTemplate>
                            <asp:Button ID="btnDelete" runat="server" Text="Delete" CssClass="btn btn-sm btn-danger" CommandName="DeleteRecord" CommandArgument='<%# Eval("ContactID") %>'/>
                            <asp:Button ID="btnEdit" runat="server" Text="Edit" CssClass="btn btn-sm btn-warning" CommandName="EditRecord" CommandArgument='<%# "~/AdminPanel/Contact/ContactAddEdit.aspx?ContactID=" + Eval("ContactID").ToString() %>'/>
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
            <asp:GridView ID="gvTest" runat="server" ViewStateMode="Enabled" Width="100%">
                <Columns>
                </Columns>
            </asp:GridView>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphScript" runat="Server">
</asp:Content>

